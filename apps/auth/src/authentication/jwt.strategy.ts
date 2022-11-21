import { parse } from 'cookie';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AUTH_CONFIG_REGISTER_KEY, AuthConfigType } from '@contests/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '../users/user.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      aud: configService.get<AuthConfigType>(AUTH_CONFIG_REGISTER_KEY).jwt.aud,
      iss: configService.get<AuthConfigType>(AUTH_CONFIG_REGISTER_KEY).jwt.iss,
      secretOrKey: configService.get<AuthConfigType>(AUTH_CONFIG_REGISTER_KEY)
        .jwt.key,
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    { sub, nonce }: { sub: number; nonce: string }
  ) {
    const cookies = request.headers['cookie'];
    if (!cookies) {
      throw new UnauthorizedException();
    }
    const { nonceName } = this.configService.get<AuthConfigType>(
      AUTH_CONFIG_REGISTER_KEY
    ).jwt;

    const nonces = parse(cookies);
    if (nonces[nonceName] !== nonce) {
      // TODO You should log the ip of requester,
      throw new UnauthorizedException();
    }
    // TODO looking up the userId in a list of revoked tokens,
    return this.userService.findUnique({ key: sub })
  }
}
