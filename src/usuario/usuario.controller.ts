import { Controller, Post, Body, Request, UseGuards, Delete, Patch } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { PerfilDto } from './DTOs/perfil.dto';
import { UsuarioDto } from './DTOs/usuario.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { EmailDto } from './DTOs/email.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@ApiUseTags( 'Usuários' )
@Controller( 'usuario' )
export class UsuarioController {
  constructor( private readonly service: UsuarioService ) { }

  @Post()
  @ApiOperation( { title: 'Cadastro de novos usuários no banco de dados' } )
  @ApiResponse( {
    status: 201,
    description: 'salva um novo usuário no banco, porém sem permissões de acesso.',
  } )
  async registraUsuario ( @Body() usuarioDto: UsuarioDto ) {
    return await this.service.salvaNovoUsuario( usuarioDto );
  }



  @ApiBearerAuth()
  @UseGuards( AuthGuard( 'jwt' ), AdminGuard )
  @Patch( 'perfil' )
  @ApiOperation( { title: 'Edição de perfis de usuários' } )
  @ApiResponse( {
    status: 200,
    description: 'Disponível apenas para Administradores, essa rota altera o perfil de um usuário dado',
  } )
  async updatePerfilUsuario ( @Request() req, @Body() perfilDto: PerfilDto ) {
    return await this.service.setPerfilUsuario( perfilDto, req.user );
  }

  @ApiBearerAuth()
  @UseGuards( AuthGuard( 'jwt' ), AdminGuard )
  @Patch( 'status' )
  @ApiOperation( { title: 'Edição de status de usuários' } )
  @ApiResponse( {
    status: 200,
    description: 'Disponível apenas para Administradores, essa rota inverte o status de um usuário dado',
  } )
  async updateStatusAtivo ( @Request() req, @Body() emailDto: EmailDto ) {
    return await this.service.inverteStatusAtivo( emailDto, req.user );
  }

  @ApiBearerAuth()
  @UseGuards( AuthGuard( 'jwt' ), AdminGuard )
  @ApiOperation( { title: 'Remoção de usuários do banco de dados' } )
  @ApiResponse( {
    status: 200,
    description: 'Disponível apenas para Administradores, essa rota remove um usuário do banco',
  } )
  @Delete()
  async deletaUsuario ( @Request() req, @Body() emailDto: EmailDto ) {
    return await this.service.deletaUsuario( emailDto, req.user );
  }


}
