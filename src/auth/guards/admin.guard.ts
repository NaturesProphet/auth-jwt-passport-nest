import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {

  canActivate ( context: ExecutionContext ): boolean {
    let req = context.switchToHttp().getRequest();
    if ( req.user && req.user.accountType == 'admin' ) {
      return true;
    } else {
      throw new ForbiddenException( `Recurso disponível apenas para administradores do sistema` );
    }
  }
}
