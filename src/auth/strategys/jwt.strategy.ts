import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { apiJWTKey } from '../../common/configs/api.conf';

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
    return { userId: payload.sub, username: payload.username };
  }
}
