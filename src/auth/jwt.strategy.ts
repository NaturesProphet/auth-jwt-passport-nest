import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { secretKey } from '../common/configs/api.conf';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {
  constructor() {
    super( {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretKey,
    } );
  }

  async validate ( payload: any ) {
    return {
      id: payload.id,
      email: payload.email,
      perfil: payload.perfil,
      nome: payload.nome,
      ativo: payload.ativo
    };
  }
}
