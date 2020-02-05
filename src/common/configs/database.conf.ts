import { Logger } from "@nestjs/common";

const db_host = process.env.DB_HOST;
const db_port: number = parseInt( process.env.DB_PORT );
const db_username = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_schema = process.env.DB_SCHEMA;

let orm_sync: boolean;
if ( !process.env.DB_ORM_SYNC ) {
  console.log( '\n\nENVIRONMENT VARIABLE DB_ORM_SYNC NOT DETECTED\n\n' );
  process.exit( 1 );
}
if ( !process.env.DB_DROP_SCHEMA ) {
  console.log( '\n\nENVIRONMENT VARIABLE DB_DROP_SCHEMA NOT DETECTED\n\n' );
  process.exit( 1 );
}
if ( process.env.DB_ORM_SYNC == 'true' ) {
  //console.log( `[!] TYPEORM SYNC IS ACTIVATED` )
  orm_sync = true;
} else {
  orm_sync = false;
}
if ( process.env.NODE_ENV != 'production' ) {
  orm_sync = true;
}
if ( !process.env.NODE_ENV ) {
  orm_sync = true;
}
if ( process.env.DB_ORM_SYNC == 'true' ) {
  Logger.warn( `TYPEORM SYNC IS ACTIVATED! I'M SURE YOU KNOW WHAT YOU ARE DOING...`, ' Database configs ' );
  //console.log( `[!] TYPEORM DROP_SCHEMA IS ACTIVATED! I'M SURE YOU KNOW WHAT YOU ARE DOING...` );
}


let drop_schema: boolean;
if ( process.env.DB_DROP_SCHEMA == 'true' ) {
  Logger.warn( `[!] TYPEORM DROP_SCHEMA IS ACTIVATED! I'M SURE YOU KNOW WHAT YOU ARE DOING...`, 'Database' )
  //console.log( `[!] TYPEORM DROP_SCHEMA IS ACTIVATED! I'M SURE YOU KNOW WHAT YOU ARE DOING...` );
  drop_schema = true;
} else {
  drop_schema = false;
}
if ( process.env.NODE_ENV == 'production' ) {
  drop_schema = false;
}



export {
  db_host, db_password,
  db_port, db_schema,
  db_username, orm_sync,
  drop_schema
}
