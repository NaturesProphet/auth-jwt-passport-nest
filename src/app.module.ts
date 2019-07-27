import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import * as db from './common/configs/database.conf';

@Module( {
  imports: [ TypeOrmModule.forRoot( {
    type: 'postgres',
    host: db.db_host,
    port: db.db_port,
    username: db.db_username,
    password: db.db_password,
    database: db.db_schema,
    entities: [ __dirname + '/**/*.model{.ts,.js}' ],
    synchronize: db.orm_sync,
    dropSchema: db.drop_schema
  } ), UsuarioModule, AuthModule ],
  controllers: [ AppController ],
  providers: [ AppService ],
} )
export class AppModule { }

