const db_host = process.env.DB_HOST;
const db_port: number = parseInt( process.env.DB_PORT );
const db_username = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_schema = process.env.DB_SCHEMA;

let orm_sync: boolean;
if ( !process.env.DB_ORM_SYNC ) {
  console.log( '\n\nA VARIAVEL DE AMBIENTE DB_ORM_SYNC NÃO '
    + 'FOI DETECTADA E PRECISA SER INFORMADA.\n\n' );
  process.exit( 1 );
}
if ( !process.env.DB_DROP_SCHEMA ) {
  console.log( '\n\nA VARIAVEL DE AMBIENTE DB_DROP_SCHEMA NÃO '
    + 'FOI DETECTADA E PRECISA SER INFORMADA.\n\n' );
  process.exit( 1 );
}
if ( process.env.DB_ORM_SYNC == 'true' ) {
  console.log( `[!] TYPEORM iniciado com SYNC ativo.` )
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

let drop_schema: boolean;
if ( process.env.DB_DROP_SCHEMA == 'true' ) {
  console.log( `[!] TYPEORM iniciado com DROP_SCHEMA ativo. Os dados antigos foram perdidos.` )
  drop_schema = true;
} else {
  drop_schema = false;
}
if ( process.env.NODE_ENV == 'production' ) {
  drop_schema = false;
}

export { db_host, db_password, db_port, db_schema, db_username, orm_sync, drop_schema }