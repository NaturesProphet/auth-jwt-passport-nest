import { setEnvironment } from './common/configs/env.confservice';
setEnvironment();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { port, env } from './common/configs/api.conf';
import * as pacote from '../package.json';

async function bootstrap () {
  const app = await NestFactory.create( AppModule );


  let options = new DocumentBuilder();
  options.setTitle( 'Financeiro BrazilGo' )
  options.setDescription( pacote.description )
  options.setVersion( pacote.version )
  options.addTag( 'Documentação das rotas disponíveis na API' )
  options.addBearerAuth();

  if ( env == 'production' ) {
    options.setSchemes( 'https', 'http' );
  } else {
    options.setSchemes( 'http', 'https' );
  }
  const document = SwaggerModule.createDocument( app, options.build() );
  SwaggerModule.setup( 'docs', app, document );


  await app.listen( port );
  console.log( `API pronta e ouvindo na porta ${port}` );
}

bootstrap();
