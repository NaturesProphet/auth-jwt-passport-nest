import { Injectable, BadRequestException, UnprocessableEntityException, ForbiddenException } from '@nestjs/common';
import { Usuario } from './usuario.model';
import { enumPerfilUsuario } from '../common/enums/perfilUsuario.enum';
import * as EmailValidator from 'email-validator';
import { PerfilDto } from './DTOs/perfil.dto';
import { UsuarioDto } from './DTOs/usuario.dto';
import { EmailDto } from './DTOs/email.dto';

export type User = any;

@Injectable()
export class UsuarioService {

  async salvaNovoUsuario ( usuarioDto: UsuarioDto ) {
    if ( EmailValidator.validate( usuarioDto.email ) && usuarioDto.nome && usuarioDto.senha ) {
      let usuario: Usuario = new Usuario();
      usuario.ativo = true;
      usuario.email = usuarioDto.email;
      usuario.nome = usuarioDto.nome;
      usuario.setPassword( usuarioDto.senha );
      usuario.perfilusuario = enumPerfilUsuario.NOVO;
      try {
        return await Usuario.insert( usuario );
      }
      catch ( erro ) {
        throw new UnprocessableEntityException( `Erro ao tentar salvar novo usuário. ${erro.message}` );
      }
    }
    else {
      throw new BadRequestException( 'Dados de registro de novo usuário inválidos.' );
    }
  }


  async buscaUsuario ( email: string ) {
    try {
      return await Usuario.findOne( { where: { email: email } } );
    }
    catch ( erro ) {
      throw new UnprocessableEntityException( `Falha ao buscar o usuario ${email}. ${erro.message}` );
    }
  }

  async setPerfilUsuario ( perfildto: PerfilDto, user: any ) {

    if ( perfildto.email == user.email ) {
      throw new BadRequestException( 'Você não pode remover seu próprio status de Administrador' );
    }
    let usuario = await this.buscaUsuario( perfildto.email );
    if ( usuario ) {
      switch ( perfildto.perfil ) {
        case "Administrador":
          usuario.perfilusuario = enumPerfilUsuario.ADMINISTRADOR;
          break;
        case "Gestor":
          usuario.perfilusuario = enumPerfilUsuario.GESTOR;
          break;
        case "Padrao":
          usuario.perfilusuario = enumPerfilUsuario.PADRAO;
          break;
        case "Novo":
          usuario.perfilusuario = enumPerfilUsuario.NOVO;
          break;
        default:
          throw new BadRequestException( `O perfil ${perfildto.perfil} informado não é válido.` );
      }
      try {
        return await Usuario.save( usuario );
      }
      catch ( erro ) {
        throw new UnprocessableEntityException( `Erro ao tentar atualizar 
        o usuario ${perfildto.email}. ${erro.message}` );
      }
    }
    else {
      throw new BadRequestException( `O usuário ${perfildto.email} não foi encontrado.` );
    }
  }


  async deletaUsuario ( emailDto: EmailDto, user: any ) {
    if ( emailDto.email == user.email ) {
      throw new BadRequestException
        ( `Você não pode remover você mesmo do banco. Fale com outro Administrador` );
    }
    let usuario: Usuario = await this.buscaUsuario( emailDto.email );
    if ( usuario ) {
      try {
        return await Usuario.remove( usuario );
      }
      catch ( erro ) {
        throw new UnprocessableEntityException
          ( `Erro ao tentar apagar o usuario ${emailDto.email}. ${erro.message}` );
      }
    } else {
      throw new BadRequestException( `O usuario ${emailDto.email} não foi encontrado.` );
    }
  }



  async inverteStatusAtivo ( emailDto: EmailDto, user: any ) {

    if ( emailDto.email == user.email ) {
      throw new BadRequestException( 'Você não pode desativar ou re-ativar você mesmo' );
    }
    let usuario = await this.buscaUsuario( emailDto.email );
    if ( usuario ) {
      let statusAtual: boolean = usuario.ativo;
      usuario.ativo = !statusAtual;
      try {
        return await Usuario.save( usuario );
      }
      catch ( erro ) {
        throw new UnprocessableEntityException( `Erro ao tentar atualizar 
        o usuario ${emailDto.email}. ${erro.message}` );
      }
    }
    else {
      throw new BadRequestException( `O usuário ${emailDto.email} não foi encontrado.` );
    }
  }


}
