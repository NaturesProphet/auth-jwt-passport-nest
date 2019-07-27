import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class GestorGuard implements CanActivate {
  canActivate (
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const usuario = context.switchToHttp().getRequest().user;
    if ( usuario.perfil == 'Administrador' || usuario.perfil == 'Gestor' ) {
      return true;
    }
    else {
      throw new ForbiddenException( `Recurso disponível apenas para Administradores do sistema` );
    }
  }
}
