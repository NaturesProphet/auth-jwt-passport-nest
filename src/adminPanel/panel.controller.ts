import { Controller, Request, UseInterceptors, UseGuards, Post, Body, Query, Get, Put } from '@nestjs/common';
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
import { ListPermissionsQuery } from './DTOs/listPermissions.query';
import { ListRolesQuery } from './DTOs/listRoles.query';
import { ListPermissionSchema } from './responseSchemas/listPermission.schema';
import { PanelBadRequest4Schema } from './responseSchemas/badRequest4.schema ';
import { UnauthorizedSchema } from '../common/responseSchemas/unauthorized.schema';
import { ListRoleSchema } from './responseSchemas/listRole.schema';
import { PanelBadRequest5Schema } from './responseSchemas/badRequest5.schema ';
import { ForbiddenSchema } from '../common/responseSchemas/forbidden.schema';
import { EditPermissionsFromRole } from './DTOs/addPermission.dto';
import { PermissionAddedSchema } from './responseSchemas/permissionAdded.schema';
import { PanelBadRequest6Schema } from './responseSchemas/badRequest6.schema ';
import { EditAccountStatusDto } from './DTOs/editAccountStatus.dto';
import { UpdatePasswordDto } from '../auth/DTOs/updatePassword.dto';
import { UpdatedPasswordSchema } from './responseSchemas/updatedPassword.schema';
import { PermissionsRemovedSchema } from './responseSchemas/permissionRemoved.schema';
import { PanelBadRequest7Schema } from './responseSchemas/badRequest7.schema ';
import { PanelBadRequest8Schema } from './responseSchemas/badRequest8.schema';
import { AdminPasswordUpdatedSchema } from './responseSchemas/adminPasswordUpdated.schema';
import { PanelBadRequest9Schema } from './responseSchemas/badRequest9.schema';


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
    status: 401,
    description: 'Não autenticado ou token expirado',
    schema: UnauthorizedSchema
  } )
  @ApiResponse( {
    status: 403,
    description: 'Recurso proibido para o usuário contido no token',
    schema: ForbiddenSchema
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
    status: 401,
    description: 'Não autenticado ou token expirado',
    schema: UnauthorizedSchema
  } )
  @ApiResponse( {
    status: 403,
    description: 'Recurso proibido para o usuário contido no token',
    schema: ForbiddenSchema
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
    summary: 'Listar permissões.',
    description: 'Lista as permissões básicas existentes'
  } )
  @ApiResponse( {
    status: 200,
    description: 'Consulta Ok',
    schema: ListPermissionSchema
  } )
  @ApiResponse( {
    status: 400,
    description: 'Um ou mais dados enviados não passaram no teste de validação do class-validator',
    schema: PanelBadRequest4Schema
  } )
  @ApiResponse( {
    status: 401,
    description: 'Não autenticado ou token expirado',
    schema: UnauthorizedSchema
  } )
  @ApiResponse( {
    status: 403,
    description: 'Recurso proibido para o usuário contido no token',
    schema: ForbiddenSchema
  } )
  @ApiResponse( {
    status: 422,
    description: 'Erro genérico durante o processamento da requisição',
    schema: UnprocessableSchema
  } )
  @Get( 'permission' )
  async listPermissions ( @Request() req, @Query() query: ListPermissionsQuery ) {
    return this.service.listPermissions( req, query );
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
    status: 401,
    description: 'Não autenticado ou token expirado',
    schema: UnauthorizedSchema
  } )
  @ApiResponse( {
    status: 403,
    description: 'Recurso proibido para o usuário contido no token',
    schema: ForbiddenSchema
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











  @ApiBearerAuth()
  @UseGuards( AuthGuard( 'jwt' ), AdminGuard )
  @ApiOperation( {
    summary: 'Listar roles',
    description: 'Lista as roles existentes'
  } )
  @ApiResponse( {
    status: 200,
    description: 'Consulta Ok',
    schema: ListRoleSchema
  } )
  @ApiResponse( {
    status: 400,
    description: 'Um ou mais dados enviados não passaram no teste de validação do class-validator',
    schema: PanelBadRequest5Schema
  } )
  @ApiResponse( {
    status: 401,
    description: 'Não autenticado ou token expirado',
    schema: UnauthorizedSchema
  } )
  @ApiResponse( {
    status: 403,
    description: 'Recurso proibido para o usuário contido no token',
    schema: ForbiddenSchema
  } )
  @ApiResponse( {
    status: 422,
    description: 'Erro genérico durante o processamento da requisição',
    schema: UnprocessableSchema
  } )
  @Get( 'role' )
  async listRoles ( @Request() req, @Query() query: ListRolesQuery ) {
    return this.service.listRoles( req, query );
  }





  @ApiBearerAuth()
  @UseGuards( AuthGuard( 'jwt' ), AdminGuard )
  @ApiOperation( {
    summary: 'Adicionar permissões à Role',
    description: 'Adiciona uma lista de permissões à uma role.'
  } )
  @ApiResponse( {
    status: 200,
    description: 'Sucesso.',
    schema: PermissionAddedSchema
  } )
  @ApiResponse( {
    status: 400,
    description: 'Um ou mais dados enviados não passaram no teste de validação do class-validator',
    schema: PanelBadRequest6Schema
  } )
  @ApiResponse( {
    status: 401,
    description: 'Não autenticado ou token expirado',
    schema: UnauthorizedSchema
  } )
  @ApiResponse( {
    status: 403,
    description: 'Recurso proibido para o usuário contido no token',
    schema: ForbiddenSchema
  } )
  @ApiResponse( {
    status: 422,
    description: 'Erro genérico durante o processamento da requisição',
    schema: UnprocessableSchema
  } )
  @Put( 'role/permission/add' )
  async addPermissionsToRole ( @Request() req, @Body() dto: EditPermissionsFromRole ) {
    return this.service.addPermissionsToRole( req );
  }








  @ApiBearerAuth()
  @UseGuards( AuthGuard( 'jwt' ), AdminGuard )
  @ApiOperation( {
    summary: 'Remover permissões de uma Role',
    description: 'remove uma lista de permissões de uma role.'
  } )
  @ApiResponse( {
    status: 200,
    description: 'Sucesso.',
    schema: PermissionsRemovedSchema
  } )
  @ApiResponse( {
    status: 400,
    description: 'Um ou mais dados enviados não passaram no teste de validação do class-validator',
    schema: PanelBadRequest7Schema
  } )
  @ApiResponse( {
    status: 401,
    description: 'Não autenticado ou token expirado',
    schema: UnauthorizedSchema
  } )
  @ApiResponse( {
    status: 403,
    description: 'Recurso proibido para o usuário contido no token',
    schema: ForbiddenSchema
  } )
  @ApiResponse( {
    status: 422,
    description: 'Erro genérico durante o processamento da requisição',
    schema: UnprocessableSchema
  } )
  @Put( 'role/permission/remove' )
  async removePermissionsToRole ( @Request() req, @Body() dto: EditPermissionsFromRole ) {
    return this.service.removePermissionsToRole( req );
  }








  @ApiBearerAuth()
  @UseGuards( AuthGuard( 'jwt' ), AdminGuard )
  @ApiOperation( {
    summary: 'Alterar status de contas de usuários',
    description: 'Altera o status de contas de usuários, excluindo, ativando ou suspendendo essas contas'
  } )
  @ApiResponse( {
    status: 200,
    description: 'Sucesso.',
    schema: UpdatedPasswordSchema
  } )
  @ApiResponse( {
    status: 400,
    description: 'Um ou mais dados enviados não passaram no teste de validação do class-validator',
    schema: PanelBadRequest8Schema
  } )
  @ApiResponse( {
    status: 401,
    description: 'Não autenticado ou token expirado',
    schema: UnauthorizedSchema
  } )
  @ApiResponse( {
    status: 403,
    description: 'Recurso proibido para o usuário contido no token',
    schema: ForbiddenSchema
  } )
  @ApiResponse( {
    status: 422,
    description: 'Erro genérico durante o processamento da requisição',
    schema: UnprocessableSchema
  } )
  @Put( 'accounts/status' )
  async editAccountStatus ( @Request() req, @Body() dto: EditAccountStatusDto ) {
    return this.service.editAccountStatus( req );
  }










  @ApiBearerAuth()
  @UseGuards( AuthGuard( 'jwt' ), AdminGuard )
  @ApiOperation( {
    summary: 'Atualizar senha de administrador',
    description: 'Altera a senha do usuário'
  } )
  @ApiResponse( {
    status: 200,
    description: 'Sucesso.',
    schema: AdminPasswordUpdatedSchema
  } )
  @ApiResponse( {
    status: 400,
    description: 'Um ou mais dados enviados não passaram no teste de validação do class-validator',
    schema: PanelBadRequest9Schema
  } )
  @ApiResponse( {
    status: 401,
    description: 'Não autenticado ou token expirado',
    schema: UnauthorizedSchema
  } )
  @ApiResponse( {
    status: 403,
    description: 'Recurso proibido para o usuário contido no token',
    schema: ForbiddenSchema
  } )
  @ApiResponse( {
    status: 422,
    description: 'Erro genérico durante o processamento da requisição',
    schema: UnprocessableSchema
  } )
  @Put( 'accounts/admin/password' )
  async updatePassword ( @Request() req, @Body() dto: UpdatePasswordDto ) {
    return this.service.updatePassword( req );
  }

}
