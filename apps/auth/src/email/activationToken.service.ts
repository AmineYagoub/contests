import { readFileSync } from 'fs';
import { compile } from 'handlebars';
import { createTransport, Transporter } from 'nodemailer';

import { AUTH_CONFIG_REGISTER_KEY, AuthConfigType } from '@contests/config';
import {
  USER_CHANGE_PASSWORD,
  USER_CREATED_EVENT,
  UserMutatedEvent,
} from '@contests/types';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
import { Prisma } from '@prisma/auth-service';

import { PrismaService } from '../app/prisma.service';

import SMTPTransport = require('nodemailer/lib/smtp-transport');
@Injectable()
export class ActivationTokenService {
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
   * Find Email token by its unique key.
   *
   * @param input Prisma.EmailTokenWhereUniqueInput The unique key of the token.
   * @returns Promise<ActivationToken | null>
   */
  async findUnique(input: Prisma.EmailTokenWhereUniqueInput) {
    try {
      return this.prisma.emailToken.findUniqueOrThrow({
        where: input,
        include: {
          user: true,
        },
      });
    } catch (error) {
      Logger.error(error);
    }
  }

  /**
   * Activate Email and Delete Email token
   *
   * @param where Prisma.EmailTokenWhereUniqueInput.
   * @returns Promise<EmailToken>
   */
  async activateEmailToken(where: Prisma.EmailTokenWhereUniqueInput) {
    return this.prisma.user.update({
      data: {
        emailConfirmed: true,
        emailToken: {
          delete: true,
        },
      },
      where,
    });
  }

  /**
   * Send Activation code to user email
   *
   * @param payload: UserMutatedEvent
   *
   * @returns Promise<SMTPTransport.SentMessageInfo>
   */
  @OnEvent(USER_CREATED_EVENT)
  async emailActivationCode(
    payload: UserMutatedEvent
  ): Promise<SMTPTransport.SentMessageInfo> {
    return this.sendEmail(payload, 'verify');
  }

  /**
   * Send random token to user email in order to change user password
   *
   * @param payload: UserMutatedEvent
   *
   * @returns Promise<SMTPTransport.SentMessageInfo>
   */
  @OnEvent(USER_CHANGE_PASSWORD)
  async emailPasswordChangeToken(
    payload: UserMutatedEvent
  ): Promise<SMTPTransport.SentMessageInfo> {
    return this.sendEmail(payload, 'forgot');
  }

  /**
   * Send Email to user.
   *
   * @param payload UserMutatedEvent
   * @param path string
   *
   * @returns Promise<SMTPTransport.SentMessageInfo>
   */
  private async sendEmail(
    payload: UserMutatedEvent,
    path: string
  ): Promise<SMTPTransport.SentMessageInfo> {
    const { templatePath, baseUrl, from, siteName } = this.config.mail;
    const { email, template, id, token } = payload;
    try {
      const emailTemplateSource = readFileSync(
        `${templatePath}${template}.hbs`,
        'utf8'
      );
      const compiled = compile(emailTemplateSource);
      const htmlToSend = compiled({
        link: `${baseUrl}/auth/${path}/${id}/${token}`,
        baseUrl,
        siteName,
      });
      const message = {
        from: from,
        to: email,
        subject: siteName,
        html: htmlToSend,
      };
      return new Promise((resolve, reject) => {
        this.transporter.sendMail(message, (err: Error, info: string) => {
          if (err) reject(err);
          else resolve(info);
        });
      });
    } catch (error) {
      Logger.error(error);
    }
  }
}
