import { google } from 'googleapis';

import { AUTH_CONFIG_REGISTER_KEY, AuthConfigType } from '@contests/config';
import { SigningWithGoogleDto } from '@contests/dto';
import { RoleTitle } from '@contests/types';
import { generateUserKey } from '@contests/utils';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from '../app/prisma.service';
import { JWTToken } from '../jwt/jwt.model';
import { AuthService } from './auth.service';

import type { OAuth2Client } from 'google-auth-library';
@Injectable()
export class GoogleAuthService {
  private oauthClient: OAuth2Client;
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,

    private prisma: PrismaService
  ) {
    const authConfig = this.configService.get<AuthConfigType>(
      AUTH_CONFIG_REGISTER_KEY
    ).google;
    this.oauthClient = new google.auth.OAuth2(authConfig.id, authConfig.secret);
  }

  /**
   * Login with google
   *
   * @param payload: SigningWithGoogleDto
   * @returns
   */
  async authenticateWithGoogle(
    payload: SigningWithGoogleDto
  ): Promise<JWTToken> {
    const { token, email, image } = payload;
    const tokenInfo = await this.oauthClient.getTokenInfo(token);
    if (email !== tokenInfo.email) {
      throw new UnprocessableEntityException('invalid google token');
    }
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { email },
        include: { role: true },
      });
      return await this.authService.generateJWTTokenFor(user);
    } catch (error) {
      if (error.status !== 404) {
        throw new error();
      }
      const user = await this.prisma.user.create({
        data: {
          image,
          email,
          password: 'google',
          key: generateUserKey(),
          agreement: true,
          emailConfirmed: true,
          role: {
            connectOrCreate: {
              create: {
                title: RoleTitle.STUDENT,
              },
              where: {
                title: RoleTitle.STUDENT,
              },
            },
          },
        },
        include: {
          role: true,
        },
      });
      return await this.authService.generateJWTTokenFor(user);
    }
  }
}
