import { Controller, Get, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './DTOs/login.dto';

@ApiTags( 'Autenticação' )
@Controller( 'auth' )
export class AuthController {
  constructor( private readonly authService: AuthService ) { }

  @ApiOperation( {
    summary: 'Login de usuários',
    description: 'Valida os dados de login e devolve um JWT para uso nesta api.'
  } )
  @ApiResponse( {
    status: 201,
    description: 'Usuário autenticado e token gerado.',
    schema: {
      example: {
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNocmlzIiwic3ViIjoyLCJpYXQiOjE1ODA4NDE5NjMsImV4cCI6MTU4MDg0Mjg2M30.HIQ3Rdmgaucy3xImo3PjcElOAk-mYKKkSIlXYUKCNnw",
        user: {
          userId: 2,
          username: "chris"
        }
      }
    }
  } )
  @ApiResponse( {
    status: 401,
    description: 'Dados de login inválidos',
    schema: {
      example: {
        statusCode: 401,
        error: "Unauthorized"
      }
    }
  } )
  @UseGuards( AuthGuard( 'local' ) )
  @Post( 'login' )
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
    schema: {
      example: {
        userId: 2,
        username: "chris"
      }
    }
  } )
  @ApiResponse( {
    status: 401,
    description: 'Usuário não está autenticado',
    schema: {
      example: {
        statusCode: 401,
        error: "Unauthorized"
      }
    }
  } )
  @Get( 'profile' )
  getProfile ( @Request() req ) {
    return req.user;
  }
}
