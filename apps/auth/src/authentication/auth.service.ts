import { randomUUID } from 'crypto';

import { AUTH_CONFIG_REGISTER_KEY, AuthConfigType } from '@contests/config';
import { SignUpDto } from '@contests/dto';
import {
  JWTToken,
  RoleTitle,
  StudentLevel,
  USER_CHANGE_PASSWORD,
  USER_CREATED_EVENT,
} from '@contests/types';
import { generateUserKey } from '@contests/utils';
import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/auth-service';

import { PrismaService } from '../app/prisma.service';
import { User } from '../users/user.model';
import { NonceService } from './nonce.service';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
    private readonly nonceService: NonceService,
    private eventEmitter: EventEmitter2,
    private prisma: PrismaService
  ) {}

  /**
   * Create New User
   *
   * @param data: SignUpDto
   * @returns Promise<boolean>
   */
  async signUp(data: SignUpDto) {
    try {
      const emailToken = randomUUID();
      const user = await this.buildUser(data, emailToken);
      const result = await this.prisma.user.create({ data: user });
      this.eventEmitter.emit(USER_CREATED_EVENT, {
        template: 'email-confirmation',
        token: emailToken,
        id: result.id,
        email: result.email,
      });
      return true;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new UnprocessableEntityException(error);
      }
      Logger.error(error);
    }
  }

  /**
   * Build Prisma User Input.
   *
   * @param data SignUpDto
   * @param emailToken string
   * @returns Promise<Prisma.UserCreateInput>
   */
  private async buildUser(data: SignUpDto, emailToken: string) {
    const { password, email, agreement, role, teacherId } = data;
    const hashedPassword = await this.passwordService.hashPassword(password);
    const user: Prisma.UserCreateInput = {
      password: hashedPassword,
      key: generateUserKey(),
      email,
      agreement,
      role: {
        connectOrCreate: {
          create: {
            title: role,
          },
          where: {
            title: role,
          },
        },
      },
      emailToken: {
        create: {
          value: emailToken,
        },
      },
    };
    if ([RoleTitle.STUDENT, RoleTitle.STUDENT_TEACHER].includes(role)) {
      user.profile = {
        create: {
          level: StudentLevel.Student,
          personalImage: `https://ui-avatars.com/api/?background=FFFFAA&color=114d8b&name=user`,
        },
      };
      if (teacherId) {
        user.profile.create.teacher.connect.id = teacherId;
      }
    }
    return user;
  }

  /**
   * Log The use in
   *
   * @param data: Prisma.UserUpdateInput
   * @returns Promise<JWTToken>
   */
  async signing(data: Prisma.UserUpdateInput): Promise<JWTToken> {
    try {
      const { email, password } = data;
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { email: String(email) },
        include: { role: true },
      });
      if (!user.isActive) {
        throw new UnauthorizedException('User Banned');
      }
      if (!user.emailConfirmed) {
        throw new UnauthorizedException(
          `User Email ${user.email} not confirmed`
        );
      }
      const passwordValid = await this.passwordService.validatePassword(
        String(password),
        user.password
      );

      if (!passwordValid) {
        throw new UnauthorizedException('Invalid Password');
      }
      return await this.generateJWTTokenFor(user);
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, error?.status || HttpStatus.NOT_FOUND);
    }
  }

  /**
   * Update user and Dispatch event.
   *
   * @param email string
   * @param template string
   * @param event string
   *
   * @returns Promise<boolean>
   */
  private async mutateAndDispatchEvent(
    email: string,
    template: string,
    event: string
  ) {
    try {
      const token = randomUUID();
      const user = await this.prisma.user.update({
        where: { email },
        data: {
          emailToken: {
            upsert: {
              create: {
                value: token,
              },
              update: {
                value: token,
              },
            },
          },
        },
      });
      this.eventEmitter.emit(event, {
        template,
        token,
        id: user.id,
        email: user.email,
      });
      return true;
    } catch (error) {
      Logger.error(error);
      throw new UnprocessableEntityException(error);
    }
  }

  /**
   * Resend email activation code
   *
   * @param email
   * @returns Promise<boolean>
   */
  async resendEmailActivationCode(email: string) {
    return this.mutateAndDispatchEvent(
      email,
      'email-confirmation',
      USER_CREATED_EVENT
    );
  }

  /**
   * Send Email token to recover user password
   *
   * @param email string
   *
   * @returns Promise<boolean>
   */
  async emailTokenToRecoverPassword(email: string) {
    return this.mutateAndDispatchEvent(
      email,
      'password-confirmation',
      USER_CHANGE_PASSWORD
    );
  }

  /**
   * Decode JWT and get user from db
   *
   * @param token string
   *
   * @returns Promise<User>
   */
  async getUserFromJWTToken(token: string) {
    const key = Number(this.jwtService.decode(token)['sub']);
    return this.prisma.user.findUniqueOrThrow({
      where: { key },
    });
  }

  /**
   * Generate Jwt token.
   *
   * @param user User
   *
   * @returns Promise<JWTToken>
   */
  async generateJWTTokenFor(user: User): Promise<JWTToken> {
    try {
      const nonce = await this.nonceService.encrypt();
      const payload = {
        sub: user.key,
        role: user.role.title,
        isActive: user.isActive,
        emailConfirmed: user.emailConfirmed,
        iat: Math.floor(Date.now() / 1000),
        nonce,
      };
      const accessToken = this.jwtService.sign(payload);
      const securityConfig = this.configService.get<AuthConfigType>(
        AUTH_CONFIG_REGISTER_KEY
      );
      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: securityConfig.jwt.refreshIn,
      });
      return {
        accessToken,
        refreshToken,
        tokenType: 'bearer',
        nonce,
      };
    } catch (error) {
      Logger.error(error);
    }
  }
}
