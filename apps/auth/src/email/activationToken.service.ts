import {
  UserMutatedEvent,
  USER_CREATED_EVENT,
  USER_CHANGE_PASSWORD,
} from '@contests/types/auth';
import { readFileSync } from 'fs';
import { compile } from 'handlebars';
import { Prisma } from '@prisma/auth-service';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';
import { createTransport, Transporter } from 'nodemailer';
import SMTPTransport = require('nodemailer/lib/smtp-transport');
import { AUTH_CONFIG_REGISTER_KEY, AuthConfigType } from '@contests/config';

@Injectable()
export class ActivationTokenService {
  private transporter: Transporter<SMTPTransport.SentMessageInfo>;
  private config: AuthConfigType;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService
  ) {
    this.config = configService.get<AuthConfigType>(AUTH_CONFIG_REGISTER_KEY);
    const { host, user, pass } = this.config.mail;
    this.transporter = createTransport({
      service: 'Outlook365',
      host: host,
      port: 25,
      tls: {
        rejectUnauthorized: false,
      },
      auth: {
        user,
        pass,
      },
    });
  }

  /**
   * Send Contact us form to Admin email
   *
   * @param email string
   * @param to number
   * @param title number
   * @param content number
   *
   * @returns Promise<SMTPTransport.SentMessageInfo>
   */
  async sendContactUsForm({
    email,
    content,
    title,
    to,
  }: {
    email: string;
    to: string;
    title: string;
    content: string;
  }): Promise<SMTPTransport.SentMessageInfo> {
    const c = this.configService.get<AuthConfigType>(AUTH_CONFIG_REGISTER_KEY);
    const message = {
      from: c.mail.from,
      subject: title,
      to,
      text: `رسالة من طرف <${email}>:
        ${content}
        `,
    };
    try {
      return new Promise((resolve, reject) => {
        this.transporter.sendMail(message, (err, info) => {
          if (err) reject(err);
          else resolve(info);
        });
      });
    } catch (error) {
      throw new Error(error);
    }
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
