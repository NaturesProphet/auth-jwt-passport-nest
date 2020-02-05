import { ConflictException, ForbiddenException } from "@nestjs/common";
import { Permission } from "src/users/permissions/models/permission.model";

/**
 * Verify if an TypeORM erromsg means the entity already exists
 * and throw a better errormsg
 * @param errorMessage error message
 */
export function checkEntityAlreadExist ( errorMessage: string ) {
  if (
    errorMessage.split( ' ' ).length > 4 &&
    errorMessage.split( ' ' )[ 0 ] == 'duplicate' &&
    errorMessage.split( ' ' )[ 1 ] == 'key' &&
    errorMessage.split( ' ' )[ 2 ] == 'value' &&
    errorMessage.split( ' ' )[ 3 ] == 'violates' ) {
    throw new ConflictException( `A entidade que você tentou cadastrar `
      + `contém um ou mais campos únicos que já existem atualmente no banco de dados.` );
  }
}


export function getLastDaysInterval ( d: Date, daysInterval?: number ): string[] {
  let startDate = new Date( d );
  let endDate = new Date( d );
  startDate.setUTCHours( 0 );
  startDate.setUTCMinutes( 0 );
  startDate.setUTCSeconds( 0 );
  startDate.setUTCMilliseconds( 0 );

  endDate.setUTCHours( 23 );
  endDate.setUTCMinutes( 59 );
  endDate.setUTCSeconds( 0 );
  endDate.setUTCMilliseconds( 0 );

  if ( daysInterval != null ) {
    startDate.setUTCDate( startDate.getDate() + 1 - daysInterval );
  }

  else {
    startDate.setUTCDate( 1 );
    endDate.setUTCDate( new Date( endDate.getFullYear(), endDate.getMonth() + 1, 0 ).getDate() );
  }
  return [ startDate.toISOString(), endDate.toISOString() ];
}


export function permissionFilter ( req: any, operation: string, feature: string ) {
  if ( req && req.user && req.user.role && req.user.role.permissions.length > 0 ) {
    let permissions: Permission[] = req.user.role.permissions;
    let valid = false;
    for ( let i = 0; i < permissions.length; i++ ) {
      if ( permissions[ i ].feature == feature && permissions[ i ].operation == operation ) {
        valid = true;
        break;
      }
    }
    if ( valid == false ) {
      throw new ForbiddenException( `${operation} ${feature}:  Permissões insuficientes` );
    }
  } else {
    throw new ForbiddenException( `Nenhuma role válida configurada para o usuário.` );
  }
}
