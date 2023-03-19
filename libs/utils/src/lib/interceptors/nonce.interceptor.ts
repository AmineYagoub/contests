import { serialize } from 'cookie';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AUTH_CONFIG_REGISTER_KEY, AuthConfigType } from '@contests/config';
import { JWTToken } from '@contests/types/auth';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class NonceInterceptor implements NestInterceptor {
  /**
   *
   * @param configService
   */
  constructor(private configService: ConfigService) {}

  /**
   * Intercept response
   *
   * @param context
   * @param next
   *
   * @returns {Observable<JWTToken>}
   */
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<JWTToken> {
    return next.handle().pipe(
      map((response) => {
        if (response) {
          const { nonce, ...jwt } = response;
          const ctx = GqlExecutionContext.create(context).getContext();
          ctx.res.setHeader('Cookie', this.buildCookie(nonce));
          return jwt;
        }
      })
    );
  }

  /**
   * Build Http Cookie.
   *
   * @param value
   * @returns {string}
   */
  private buildCookie(value: string): string {
    const config = this.configService.get<AuthConfigType>(
      AUTH_CONFIG_REGISTER_KEY
    );
    const { nonceName, nonceExpiresIn } = config.jwt;
    return serialize(nonceName, value, {
      httpOnly: true,
      maxAge: nonceExpiresIn,
      path: '/',
      sameSite: 'strict',
      secure: false,
    });
  }
}
