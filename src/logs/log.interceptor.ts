import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Log } from './models/log.model';
import { getConnection } from 'typeorm';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  intercept ( context: ExecutionContext, next: CallHandler ): Observable<any> {
    return next
      .handle()
      .pipe(
        tap( () => {
          let req = context.switchToHttp().getRequest();
          let res = context.switchToHttp().getResponse();
          if
            (
            ( req.method == 'POST' || req.method == 'DELETE'
              || req.method == "PUT" || req.method == "PATCH" &&
              ( res.statusCode == 200 || res.statusCode == 201 )
            )
            || res.statusCode == 403 ) {
            generateLog( req, res );
          }
        } ),
      );
  }
}

function generateLog ( req: any, res: any ) {
  removePasswords( req );
  try {
    let log: Log = new Log();
    log.body = JSON.stringify( req.body );
    log.endpoint = req.originalUrl;
    log.ip = req.ip;
    log.method = req.method;
    log.params = JSON.stringify( req.params );
    log.response = res.statusCode;
    if ( req.user && req.user.id ) {
      log.userId = req.user.id;
      log.accountType = req.user.accountType;
    }
    log.userAgent = req.headers[ "user-agent" ];
    getConnection().getRepository( Log ).save( log );
  } catch ( err ) {
    console.log( `Erro ao tentar salvar um log. ${err.message}\n` );
  }
}

function removePasswords ( req: any ) {
  if ( req && req.body && req.body.password ) {
    req.body.password = '***'
  }
}