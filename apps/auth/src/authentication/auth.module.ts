import { authConfig, AuthConfigType } from '@contests/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { PrismaService } from '../app/prisma.service';
import { SeedService } from '../app/seed.service';
import { UserService } from '../users/user.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { NonceService } from './nonce.service';
import { PasswordService } from './password.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (securityConfig: AuthConfigType) => {
        return {
          secret: securityConfig.jwt.key,
          signOptions: {
            expiresIn: securityConfig.jwt.expiresIn,
          },
        };
      },
      inject: [authConfig.KEY],
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    PasswordService,
    NonceService,
    PrismaService,
    UserService,
  ],
})
export class AuthModule {}
