import { createTransport } from 'nodemailer';
import { Logger } from '@nestjs/common';
import {
  emailHost, emailUser,
  emailPassword, emailPort
} from '../../common/configs/email.conf';

const transporter = createTransport( {
  host: emailHost,
  port: emailPort,
  secure: ( emailPort == 465 ),
  auth: {
    user: emailUser,
    pass: emailPassword
  },
  tls: {
    rejectUnauthorized: false
  }
} );


export async function sendEmailVerification ( email: string, message: string ) {
  try {
    await transporter.sendMail( {
      from: '"Nature`s Prophet." <noreply@someserver.com>',
      to: email,
      subject: 'Seu código de verificação',
      text: message,
      html: `<b>${message}</b>` // html body
    } );
  } catch ( err ) {
    Logger.error( `Erro ao tentar enviar email de confirmação à usuário ${err.message}` );
  }
}
