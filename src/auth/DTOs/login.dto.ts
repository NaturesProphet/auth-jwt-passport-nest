import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';


export class LoginDto {
  @IsString()
  @ApiProperty( {
    description: 'e-mail ou telefone do usuário',
    example: 'mateus.lopes@auim.com.br'
  } )
  username: string;

  @IsString()
  @ApiProperty( {
    description: 'Senha do usuário',
    example: '123456'
  } )
  password: string;
}
