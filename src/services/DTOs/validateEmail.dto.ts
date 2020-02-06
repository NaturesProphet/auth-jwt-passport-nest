import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class validateEmailDto {
  @IsString()
  @ApiProperty( {
    example: 'admin-123456',
    description: 'Código de ativação recebido por email'
  } )
  code: string;
}
