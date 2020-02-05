import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy( Strategy ) {
  constructor( private readonly authService: AuthService ) {
    super( { passReqToCallback: true } );
  }

  async validate ( req: any, username: string, password: string ): Promise<any> {
    let authENdpoint: string = req._parsedUrl.pathname;
    let accountType: string;
    switch ( authENdpoint ) {
      case '/auth/admin':
        accountType = 'admin';
        break;
      default:
        throw new UnauthorizedException( `Tipo de conta ${authENdpoint} desconhecida` );
    }
    const user = await this.authService.validateUser( username, password, accountType );
    if ( !user ) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
