import {
  createCipheriv,
  createDecipheriv,
  randomUUID,
  scryptSync,
} from 'crypto';

import { AUTH_CONFIG_REGISTER_KEY, AuthConfigType } from '@contests/config';
import { Injectable, Logger, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable({ scope: Scope.REQUEST })
export class NonceService {
  private config: AuthConfigType;
  constructor(private readonly configService: ConfigService) {
    this.config = this.configService.get<AuthConfigType>(
      AUTH_CONFIG_REGISTER_KEY
    );
  }

  /**
   * Generate encrypted random string.
   *
   * @returns {Promise<String>}
   */
  encrypt(): Promise<string> {
    const { nonceEncryptKey, nonceEncryptAlg } = this.config.jwt;
    return new Promise((resolve) => {
      const key = scryptSync(nonceEncryptKey, 'salt', 24);
      const iv = Buffer.alloc(16, 0);
      const cipher = createCipheriv(nonceEncryptAlg, key, iv);
      let encrypted = cipher.update(randomUUID(), 'utf8', 'hex');
      encrypted += cipher.final('hex');
      resolve(encrypted);
    });
  }

  /**
   * Decrypt encrypted random string.
   * @returns {Promise<String>}
   */
  decrypt(text: string): Promise<string> {
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
   * @param nonce
   * @returns {Promise<boolean>}
   */
  async validateNonce(nonce: string, headers: string[]): Promise<boolean> {
    const { nonceName } = this.config.jwt;
    const regex = new RegExp('(^|;)\\s*' + nonceName + '\\s*=\\s*([^;]+)');
    const cookie = '';
    const nonceEncrypted = regex.exec(cookie)[2] ?? null;
    const isNonce = nonceEncrypted === nonce;
    if (!isNonce) {
      Logger.warn('Invalid Nonce:' + headers.join());
    }
    return isNonce;
  }
}
