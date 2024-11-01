import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
@Injectable()
export class EmailService {
    private readonly transporter: nodemailer.Transporter;
    constructor(private configService: ConfigService) {
        console.log(this.configService.get<string>('MAIL_USER'));
        this.transporter = nodemailer.createTransport({
            host: this.configService.get<string>('MAIL_HOST'),
            port: this.configService.get<number>('MAIL_PORT'),
            auth: {
                user: this.configService.get<string>('MAIL_USER'),
                pass: this.configService.get<string>('MAIL_PASSWORD'),
            }
        });
    }
    sendSignUpEmail(email: string, token: string): void {
        const mailOptions = {
            from: this.configService.get<string>('MAIL_FROM'),
            to: email,
            subject: 'Email Verification',
            // text: `Please click the following link to verify your email: http://localhost:3000/auth/verify?token=${token}&operation=registe`,
            html: `<p>Please click the following link to verify your email: <a href="${this.configService.get<string>('CLIENT_URL')}/auth/verify?token=${token}&operation=register">Verify Email</a></p>`
        };
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                }
        });


    }
}
