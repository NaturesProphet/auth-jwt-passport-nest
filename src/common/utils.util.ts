import { ConflictException } from "@nestjs/common";

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
