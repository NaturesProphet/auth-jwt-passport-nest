import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { apiJWTKey } from '../../common/configs/api.conf';
import { AuthenticatedUser } from '../DTOs/authenticatedUser.class';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {
  constructor() {
    super( {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: apiJWTKey,
    } );
  }

  async validate ( payload: any ) {
    let user: AuthenticatedUser = {
      accountType: payload.accountType,
      email: payload.email,
      id: payload.id,
      name: payload.name,
      role: payload.role
    }
    return user;
  }
}
