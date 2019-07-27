import { setEnvironment } from '../common/configs/env.confservice';
setEnvironment();

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsuarioModule } from '../usuario/usuario.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { secretKey, tokenExpirationTime } from '../common/configs/api.conf';


@Module( {
  imports: [
    UsuarioModule,
    PassportModule,
    JwtModule.register( {
      secret: secretKey,
      signOptions: { expiresIn: tokenExpirationTime }
    } ),
  ],
  providers: [ AuthService, LocalStrategy, JwtStrategy ],
  exports: [ AuthService ],
  controllers: [ AuthController ]
} )
export class AuthModule { }
