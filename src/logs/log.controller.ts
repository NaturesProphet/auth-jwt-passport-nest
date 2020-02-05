import { Controller, Request, Get, UseInterceptors, UseGuards, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LogService } from './log.service';
import { LogInterceptor } from './log.interceptor';
import { listLogsQuery } from './DTOs/listLogs.query';
import { AuthGuard } from '@nestjs/passport';
import { GetLogSchema } from './responseSchemas/getLog.schema';
import { UnauthorizedSchema } from '../common/responseSchemas/unauthorized.schema';
import { AdminGuard } from '../auth/guards/admin.guard';
import { UnprocessableSchema } from '../common/responseSchemas/unprocessable.schema';
import { ForbiddenSchema } from '../common/responseSchemas/forbidden.schema';
import { LogBadRequestSchema } from './responseSchemas/badRequest.schema';


@ApiTags( 'Logs de acesso e auditoria' )
@UseInterceptors( LogInterceptor )
@Controller( 'log' )
export class LogController {
  constructor( private readonly service: LogService ) { }

  @ApiBearerAuth()
  @UseGuards( AuthGuard( 'jwt' ), AdminGuard )
  @ApiOperation( {
    summary: "Listar logs",
    description: 'fornece uma lista de logs conforme as query params passadas'
  } )
  @ApiResponse( {
    status: 200,
    description: "query ok",
    schema: GetLogSchema
  } )
  @ApiResponse( {
    status: 400,
    description: 'requisição inválida',
    schema: LogBadRequestSchema
  } )
  @ApiResponse( {
    status: 401,
    description: 'não autenticado',
    schema: UnauthorizedSchema
  } )
  @ApiResponse( {
    status: 403,
    description: 'Recurso proibido para o usuário contido no token',
    schema: ForbiddenSchema
  } )
  @ApiResponse( {
    status: 422,
    description: 'não processável',
    schema: UnprocessableSchema
  } )
  @Get()
  getAll ( @Request() req, @Query() query: listLogsQuery ) {
    return this.service.listLogs( req, query );
  }

}
