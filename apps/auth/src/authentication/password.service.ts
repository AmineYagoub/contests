import { hash, verify } from 'argon2';

import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordService {
  async validatePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return verify(hashedPassword, password);
  }

  async hashPassword(password: string): Promise<string> {
    return hash(password, { hashLength: 64 });
  }
}
