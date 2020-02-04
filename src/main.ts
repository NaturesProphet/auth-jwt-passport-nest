require( 'dotenv' ).config();
import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { port, nodeEnvironment } from './common/configs/api.conf';
import * as system from '../package.json';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap () {

  const httpsOptions =
    nodeEnvironment == 'production' ?
      {
        key: fs.readFileSync( './secrets/key.pem', 'utf8' ),
        cert: fs.readFileSync( './secrets/cert.pem' )
      } : null;

  const app = await NestFactory.create( AppModule, {
    httpsOptions,
  } );

  app.useGlobalPipes( new ValidationPipe() );
  app.enableCors( {
    origin: '*'
  } );


  let options = new DocumentBuilder();
  options.setTitle( 'Projeto Base' )
  options.setDescription( system.description )
  options.setVersion( system.version )
  options.addBearerAuth();
  const document = SwaggerModule.createDocument( app, options.build() );
  SwaggerModule.setup( '', app, document );


  await app.listen( port );
  console.log( `API is ready and listening to port ${port}` );
}

bootstrap();
