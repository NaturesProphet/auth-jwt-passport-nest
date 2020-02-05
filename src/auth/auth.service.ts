import { Injectable, Inject, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Admin } from '../users/admin/models/admin.model';
import { AuthenticatedUser } from './DTOs/authenticatedUser.class';
import { repositoryConfig } from '../common/configs/repository.config';
import { GenericUser } from '../users/models/genericUser.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject( repositoryConfig.admin )
    private readonly adminRepository: Repository<Admin>,
  ) { }

  async validateUser ( username: string, pass: string, accountType: string ): Promise<any> {
    let user: GenericUser;
    switch ( accountType ) {
      case 'admin':
        try {
          user = await this.adminRepository.createQueryBuilder( 'admin' )
            .addSelect( 'admin.passwordHash' )
            .leftJoinAndSelect( 'admin.role', 'role' )
            .leftJoinAndSelect( 'role.permissions', 'permissions' )
            .where( 'admin.email = email', { email: username } )
            .getOne()
        } catch ( err ) {
          throw new UnprocessableEntityException( `Erro ao buscar dados do usuário. ${err.message}` );
        }
        if ( user ) {
          user.accountType = 'admin';
        }
        break;
      default:
        throw new UnauthorizedException( `Tipo de conta ${accountType} é desconhecida.` )
    }



    if ( !user ) {
      throw new UnauthorizedException( `Usuário ${username} não encontrado` )
    }



    if ( user && bcrypt.compareSync( pass, user.getPasswordHash() ) ) {
      return user;
    }
    return null;
  }


  async login ( user: any ) {
    const payload: AuthenticatedUser = {
      name: user.name,
      email: user.email,
      id: user.id,
      accountType: user.accountType,
      role: user.role
    };
    return {
      access_token: this.jwtService.sign( payload ),
      user: payload
    };
  }
}
