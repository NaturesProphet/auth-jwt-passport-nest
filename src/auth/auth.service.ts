import { Injectable, Inject, UnauthorizedException, UnprocessableEntityException, ForbiddenException } from '@nestjs/common';
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
            .andWhere( "admin.status != 'deleted'" )
            .getOne();
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
      if ( user.getStatus() == 'deleted' ) {
        return null;
      } else if ( user.getStatus() == 'suspended' ) {
        throw new ForbiddenException( `Sua conta foi suspensa. Entre em contato com a equipe de suporte` );
      } else if ( user.getStatus() == 'pendent' ) {
        throw new UnauthorizedException( `Sua conta ainda não foi ativada. Verifique seu e-mail.` );
      }
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
      status: user.status,
      role: user.role
    };
    return {
      access_token: this.jwtService.sign( payload ),
      user: payload
    };
  }
}
