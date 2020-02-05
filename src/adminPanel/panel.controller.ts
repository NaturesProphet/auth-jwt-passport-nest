import { Controller, Request, UseInterceptors, UseGuards, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AdminPanelService } from './panel.service';
import { LogInterceptor } from '../logs/log.interceptor';
import { CreateAdminDto } from '../users/admin/DTOs/createAdmin.dto';


@ApiTags( 'Painel administrativo do sistema' )
@UseInterceptors( LogInterceptor )
@Controller( 'panel' )
export class AdminPanelController {
  constructor( private readonly service: AdminPanelService ) { }
  @Post( 'admin' )
  async createAdmin ( @Request() req, @Body() dto: CreateAdminDto ) {
    return this.service.createAdmin( req );
  }

}
