import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategys/local.strategy';
import { JwtStrategy } from './strategys/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { apiJWTKey, jwtExpirationTime } from '../common/configs/api.conf';
import { AuthController } from './auth.controller';
import { AuthProviders } from './auth.provider';
import { DatabaseModule } from '../common/Database/database.module';

@Module( {
  imports: [
    UsersModule,
    DatabaseModule,
    PassportModule,
    JwtModule.register( {
      secret: apiJWTKey,
      signOptions: { expiresIn: jwtExpirationTime },
    } ),
  ],
  providers: [ AuthService, LocalStrategy, JwtStrategy, ...AuthProviders ],
  controllers: [ AuthController ],
  exports: [ AuthService ],
} )
export class AuthModule { }
