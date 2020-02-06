import { Injectable, Inject, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { repositoryConfig } from '../common/configs/repository.config';
import { Admin } from '../users/admin/models/admin.model';
import { GenericUser } from '../users/models/genericUser.model';


@Injectable()
export class ServicesService {
  constructor(
    @Inject( repositoryConfig.admin )
    private readonly adminRepository: Repository<Admin>,
  ) { }

  async validateEmail ( req ) {
    let code: string = req[ 'params' ].code;
    let accountType: string = code.split( '-' )[ 0 ];
    let user: GenericUser;

    switch ( accountType ) {
      case 'admin':
        try {
          user = await this.adminRepository.findOne( { where: { emailVerificationCode: code } } );
        } catch ( err ) {
          throw new UnprocessableEntityException( `Erro ao consultar o banco. ${err.message}` );
        }
        if ( user ) {
          user.setStatus( 'active' );
          user.emailVerificationCode = null;
        } else {
          throw new UnprocessableEntityException( `Código não encontrado` );
        }
        try {
          await this.adminRepository.save( user );
        } catch ( err ) {
          throw new UnprocessableEntityException( `Erro ao atualizar conta. ${err.message}` );
        }
        break;
      //...
      //..
      //...
      default:
        throw new UnprocessableEntityException( `Código de ativação inválido.` );
        break;
    }
    return `Bem vindo(a) ${user.name}! Sua conta foi ativada com sucesso.`;
  }

}
