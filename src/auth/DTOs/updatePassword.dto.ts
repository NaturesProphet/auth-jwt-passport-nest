import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdatePasswordDto {
  @IsString()
  @ApiProperty( {
    example: '123456',
    description: 'Senha atual'
  } )
  password: string;

  @IsString()
  @ApiProperty( {
    example: '654321',
    description: 'Nova senha'
  } )
  newPassword: string;
}
