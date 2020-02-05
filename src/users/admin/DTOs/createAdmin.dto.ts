import { CreateGenericUserDto } from "../../DTOs/createGenericUser.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class CreateAdminDto extends CreateGenericUserDto {
  @IsNumberString()
  @ApiProperty( {
    example: '1',
    description: 'ID de uma Role a qual o novo administrador pertencerá'
  } )
  roleId: number;
}
