import { Controller, Get, Request, Post, UseGuards, Body, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './DTOs/login.dto';
import { LogInterceptor } from '../logs/log.interceptor';
import { UnauthorizedSchema } from '../common/responseSchemas/unauthorized.schema';
import { AdminAuthSuccessSchema } from './responseSchemas/adminAuthSuccess.schema';
import { ReadTokenSchema } from './responseSchemas/readToken.schema';

@UseInterceptors( LogInterceptor )
@ApiTags( 'Autenticação' )
@Controller( 'auth' )
export class AuthController {
  constructor( private readonly authService: AuthService ) { }

  @ApiOperation( {
    summary: 'Login de usuários administradores',
    description: 'Valida os dados de login e devolve um JWT para uso nesta api.'
  } )
  @ApiResponse( {
    status: 201,
    description: 'Usuário autenticado e token gerado.',
    schema: AdminAuthSuccessSchema
  } )
  @ApiResponse( {
    status: 401,
    description: 'Dados de login inválidos',
    schema: UnauthorizedSchema
  } )
  @UseGuards( AuthGuard( 'local' ) )
  @Post( 'admin' )
  async login ( @Request() req, @Body() dto: LoginDto ) {
    return this.authService.login( req.user );
  }


  @UseGuards( AuthGuard( 'jwt' ) )
  @ApiBearerAuth()
  @ApiOperation( {
    summary: 'Verificação do token',
    description: 'Exibe os dados desciptografados contido no token'
  } )
  @ApiResponse( {
    status: 200,
    description: 'Token lido com sucesso.',
    schema: ReadTokenSchema
  } )
  @ApiResponse( {
    status: 401,
    description: 'Usuário não está autenticado',
    schema: UnauthorizedSchema
  } )
  @Get( 'profile' )
  getProfile ( @Request() req ) {
    return req.user;
  }
}
