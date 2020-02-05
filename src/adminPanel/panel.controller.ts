import { Controller, Request, UseInterceptors, UseGuards, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AdminPanelService } from './panel.service';
import { LogInterceptor } from '../logs/log.interceptor';
import { CreateAdminDto } from '../users/admin/DTOs/createAdmin.dto';
import { CreatePermissionDto } from './DTOs/createPermission.dto';
import { CreateRoleDto } from './DTOs/createRole.dto';
import { DuplicatedSchema } from '../common/responseSchemas/duplicate.schema';
import { UnprocessableSchema } from '../common/responseSchemas/unprocessable.schema';
import { AdminGuard } from '../auth/guards/admin.guard';
import { AdminCreatedSchema } from './responseSchemas/adminCreated.schema';
import { PanelBadRequest1Schema } from './responseSchemas/badRequest1.schema';
import { PermissionCreatedSchema } from './responseSchemas/permissionCreated.schema';
import { PanelBadRequest2Schema } from './responseSchemas/badRequest2.schema';
import { RoleCreatedSchema } from './responseSchemas/roleCreated.schema';
import { PanelBadRequest3Schema } from './responseSchemas/badRequest3.schema';


@ApiTags( 'Painel administrativo do sistema' )
@UseInterceptors( LogInterceptor )
@Controller( 'panel' )
export class AdminPanelController {
  constructor( private readonly service: AdminPanelService ) { }

  @ApiBearerAuth()
  @UseGuards( AuthGuard( 'jwt' ), AdminGuard )
  @ApiOperation( {
    summary: 'Criar contas de administrador',
    description: 'Cria uma nova conta de administrador'
  } )
  @ApiResponse( {
    status: 201,
    description: 'Conta criada com sucesso',
    schema: AdminCreatedSchema
  } )
  @ApiResponse( {
    status: 400,
    description: 'Um ou mais dados enviados não passaram no teste de validação do class-validator',
    schema: PanelBadRequest1Schema
  } )
  @ApiResponse( {
    status: 409,
    description: 'Já existe um administrador usando um ou mais dos dados únicos informados no dto.',
    schema: DuplicatedSchema
  } )
  @ApiResponse( {
    status: 422,
    description: 'Erro genérico durante o processamento da requisição',
    schema: UnprocessableSchema
  } )
  @Post( 'admin' )
  async createAdmin ( @Request() req, @Body() dto: CreateAdminDto ) {
    return this.service.createAdmin( req );
  }













  @ApiBearerAuth()
  @UseGuards( AuthGuard( 'jwt' ), AdminGuard )
  @ApiOperation( {
    summary: 'Cria uma nova permissão.',
    description: 'Cria uma nova permissão, baseada na tupla de enums {operação, feature}. '
      + 'Esta combinação especifica uma ação que poderá ser feita em uma determinada feature do sistema.'
  } )
  @ApiResponse( {
    status: 201,
    description: 'Permissão criada com sucesso.',
    schema: PermissionCreatedSchema
  } )
  @ApiResponse( {
    status: 400,
    description: 'Um ou mais dados enviados não passaram no teste de validação do class-validator',
    schema: PanelBadRequest2Schema
  } )
  @ApiResponse( {
    status: 409,
    description: 'A permissão já existe',
    schema: DuplicatedSchema
  } )
  @ApiResponse( {
    status: 422,
    description: 'Erro genérico durante o processamento da requisição',
    schema: UnprocessableSchema
  } )
  @Post( 'permission' )
  async createPermission ( @Request() req, @Body() dto: CreatePermissionDto ) {
    return this.service.createPermission( req );
  }











  @ApiBearerAuth()
  @UseGuards( AuthGuard( 'jwt' ), AdminGuard )
  @ApiOperation( {
    summary: 'Cria uma nova Role',
    description: 'Cria uma nova role com o nome especificado e as permissões informadas numa lista'
  } )
  @ApiResponse( {
    status: 201,
    description: 'Role criada com sucesso',
    schema: RoleCreatedSchema
  } )
  @ApiResponse( {
    status: 400,
    description: 'Um ou mais dados enviados não passaram no teste de validação do class-validator',
    schema: PanelBadRequest3Schema
  } )
  @ApiResponse( {
    status: 409,
    description: 'A role já existe',
    schema: DuplicatedSchema
  } )
  @ApiResponse( {
    status: 422,
    description: 'Erro genérico durante o processamento da requisição',
    schema: UnprocessableSchema
  } )
  @Post( 'role' )
  async createRole ( @Request() req, @Body() dto: CreateRoleDto ) {
    return this.service.createRole( req );
  }

}
