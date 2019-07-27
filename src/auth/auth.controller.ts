import { Controller, UseGuards, Post, Get, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { loginDto } from './DTOs/login.dto';
import { ApiUseTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminGuard } from './guards/admin.guard';

@ApiUseTags( 'Autenticação' )
@Controller( 'login' )
export class AuthController {
  constructor( private readonly authService: AuthService ) { }

  @UseGuards( AuthGuard( 'local' ) )
  @Post()
  @ApiOperation( { title: 'Autenticação' } )
  @ApiResponse( {
    status: 201,
    description: 'Autenticação bem sucedida e token gerado',
  } )
  async login ( @Request() req, @Body() loginPayload: loginDto ) {
    return this.authService.login( req.user );
  }

  @ApiBearerAuth()
  @UseGuards( AuthGuard( 'jwt' ), AdminGuard )
  @Get()
  @ApiOperation( { title: 'Verificação' } )
  @ApiResponse( {
    status: 200,
    description: 'Esta rota exibe o usuário logado atualmente',
  } )
  getProfile ( @Request() req ) {
    return req.user;
  }
}
