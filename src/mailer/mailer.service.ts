import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');
import { ConfigService } from '@nestjs/config';
import { createHash } from 'crypto';
@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: this.configService.get('SMTP_PORT'),
      secure: this.configService.get('SMTP_SECURE'), // true for 465, false for other ports
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASSWORD'),
      },
    });
  }
  private transporter;
  public confirm(token, email) {
    const hash = createHash('sha256')
      .update(email + this.configService.get('HASH_SALT'))
      .digest('hex');
    return token === hash;
  }
  public async sendRecoverMessage(user): Promise<void> {
    const hash = createHash('sha256')
      .update(user.email + this.configService.get('HASH_SALT'))
      .digest('hex');
    const link =
      this.configService.get('RECOVER_LINK') +
      `?token=${hash}&email=${user.email}`;
    console.log(link);
    const info = await this.transporter.sendMail({
      from: this.configService.get('SMTP_SENDER'),
      to: user.email,
      subject: 'Instagig password recovery',
      html: `
      <p>You have requested password recovery for instagig.
      Please follow <a href=${link}>this link</a> 
      to set a new password.</p>
      `,
    });
    console.log(info);
  }
  public async sendEmailConfirmation(user): Promise<void> {
    const hash = createHash('sha256')
      .update(user.email + this.configService.get('HASH_SALT'))
      .digest('hex');
    const link =
      this.configService.get('CONFIRM_LINK') +
      `?token=${hash}&email=${user.email}`;
    console.log(link);
    const info = await this.transporter.sendMail({
      from: this.configService.get('SMTP_SENDER'),
      to: user.email,
      subject: 'Instagig registration ✔',
      html: `
      <p>Your email was registered at instagig.
      Please follow <a href=${link}>this link</a> 
      to finish the registration process.</p>
      `,
    });
    console.log(info);
  }
}
