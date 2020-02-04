import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';


export class LoginDto {
  @IsString()
  @ApiProperty( {
    description: 'e-mail ou telefone do usuário',
    example: 'chris'
  } )
  username: string;

  @IsString()
  @ApiProperty( {
    description: 'Senha do usuário',
    example: 'secret'
  } )
  password: string;
}
