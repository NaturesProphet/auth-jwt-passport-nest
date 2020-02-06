import { Controller, UseInterceptors, Get, Request, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { LogInterceptor } from '../logs/log.interceptor';
import { ServicesService } from './services.service';
import { validateEmailDto } from './DTOs/validateEmail.dto';
import { UnprocessableSchema } from '../common/responseSchemas/unprocessable.schema';
import { ValidateEmailSuccessSchema } from './responseSchemas/validateEmailSuccess.schema';

@ApiTags( 'Serviços diversos para comunicação e integração entre sistemas' )
@UseInterceptors( LogInterceptor )
@Controller( 'services' )
export class ServicesController {
  constructor( private readonly service: ServicesService ) { }

  @ApiOperation( {
    summary: 'Confirmação de e-mail',
    description: 'Recebe o código de ativação de contas de usuário que foram '
      + 'enviados para seus e-mails, ativando a conta'
  } )
  @ApiResponse( {
    status: 200,
    description: 'Email validado com sucesso.',
    schema: ValidateEmailSuccessSchema
  } )
  @ApiResponse( {
    status: 422,
    description: 'Erro genérico durante o processamento da requisição',
    schema: UnprocessableSchema
  } )
  @Get( 'accounts/email/validation/:code' )
  async validateEmailConfirmations ( @Request() req, @Param() code: validateEmailDto ) {
    return this.service.validateEmail( req );
  }

}
