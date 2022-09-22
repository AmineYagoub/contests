import { createCipheriv, createDecipheriv, scryptSync } from 'crypto';

import { AUTH_CONFIG_REGISTER_KEY, AuthConfigType } from '@contests/config';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONTEXT } from '@nestjs/graphql';

@Injectable({ scope: Scope.REQUEST })
export class NonceService {
  private config: AuthConfigType;
  constructor(
    private readonly configService: ConfigService,
    @Inject(CONTEXT) private context
  ) {
    this.config = this.configService.get<AuthConfigType>(
      AUTH_CONFIG_REGISTER_KEY
    );
  }

  /**
   * @returns {Promise<String>}
   */
  encrypt(text: string = this.getUserAgent()): Promise<string> {
    const { nonceEncryptKey, nonceEncryptAlg } = this.config.jwt;
    return new Promise((resolve) => {
      const key = scryptSync(nonceEncryptKey, 'salt', 24);
      const iv = Buffer.alloc(16, 0);
      const cipher = createCipheriv(nonceEncryptAlg, key, iv);
      let encrypted = cipher.update(text, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      resolve(encrypted);
    });
  }

  /**
   *
   * @returns {Promise<String>}
   */
  decrypt(text: string = this.getUserAgent()): Promise<string> {
    const { nonceEncryptKey, nonceEncryptAlg } = this.config.jwt;
    return new Promise((resolve) => {
      const key = scryptSync(nonceEncryptKey, 'salt', 24);
      const iv = Buffer.alloc(16, 0);
      const decipher = createDecipheriv(nonceEncryptAlg, key, iv);
      let decrypted = decipher.update(text, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      resolve(decrypted);
    });
  }

  /**
   *
   * @returns {string}
   */
  private getUserAgent(): string {
    return this.context.req.headers['user-agent'];
  }

  /**
   *
   * @param nonce
   * @returns {Promise<boolean>}
   */
  async validateNonce(nonce: string, headers: string[]): Promise<boolean> {
    const { nonceName } = this.config.jwt;
    const regex = new RegExp('(^|;)\\s*' + nonceName + '\\s*=\\s*([^;]+)');
    const { cookie } = this.context.req.headers;
    const nonceEncrypted = regex.exec(cookie)[2] ?? null;
    const isNonce =
      nonceEncrypted === nonce &&
      (await this.decrypt()) === this.getUserAgent();
    if (!isNonce) {
      Logger.warn('Invalid Nonce:' + headers.join());
    }
    return isNonce;
  }
}
