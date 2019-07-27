import { Injectable, ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly UsuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser ( email: string, senha: string ): Promise<any> {
    const user = await this.UsuarioService.buscaUsuario( email );
    if ( !user.ativo ) {
      throw new ForbiddenException
        ( `O usuario ${user.email} está INATIVO. Fale com um Administrador` );
    }
    if ( user.perfilusuario == 'Novo' ) {
      throw new ForbiddenException
        ( `O usuário ${user.email} existe, mas ainda não foi inicializado. Fale com um Administrador.` );
    }
    if ( user && await bcrypt.compare( senha, user.getHash() ) ) {
      return user;
    }
    return null;
  }

  async login ( user: any ) {
    const payload = {
      email: user.email,
      id: user.id,
      perfil: user.perfilusuario,
      nome: user.nome,
      ativo: user.ativo
    };
    return {
      access_token: `Bearer ${this.jwtService.sign( payload )}`,
    };
  }
}
