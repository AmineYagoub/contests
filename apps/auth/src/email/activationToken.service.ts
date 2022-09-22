import { readFileSync } from 'fs';
import { compile } from 'handlebars';
import { createTransport, Transporter } from 'nodemailer';

import { AUTH_CONFIG_REGISTER_KEY, AuthConfigType } from '@contests/config';
import { USER_CREATED_EVENT, UserCreatedEvent } from '@contests/types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';

import { PrismaService } from '../app/prisma.service';

import SMTPTransport = require('nodemailer/lib/smtp-transport');
@Injectable()
export class TokenService {
  private transporter: Transporter<SMTPTransport.SentMessageInfo>;
  private config: AuthConfigType;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService
  ) {
    this.config = configService.get<AuthConfigType>(AUTH_CONFIG_REGISTER_KEY);
    const { smtp, user, pass } = this.config.mail;
    this.transporter = createTransport({
      service: smtp,
      auth: {
        user,
        pass,
      },
    });
  }

  /**
   * Send Activation code to user email
   *
   * @param payload: UserCreatedEvent
   *
   * @returns Promise<SMTPTransport.SentMessageInfo>
   */
  @OnEvent(USER_CREATED_EVENT)
  async emailActivationCode(
    payload: UserCreatedEvent
  ): Promise<SMTPTransport.SentMessageInfo> {
    const { templatePath, redirectUrl, from, subject } = this.config.mail;
    const { email, token, query, template } = payload;

    console.log(payload);

    try {
      const emailTemplateSource = readFileSync(
        `${templatePath}${template}.hbs`,
        'utf8'
      );
      const compiled = compile(emailTemplateSource);
      const htmlToSend = compiled({
        link: `${redirectUrl}${query}=${token}`,
      });
      const message = {
        from: from,
        to: email,
        subject: subject,
        html: htmlToSend,
      };
      return new Promise((resolve, reject) => {
        this.transporter.sendMail(message, (err: Error, info: string) => {
          if (err) reject(err);
          else resolve(info);
        });
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
// TODO 5 times in 10 minutes without verifying the number.
// TODO Retry buffers help prevent both accidentally spamming users
