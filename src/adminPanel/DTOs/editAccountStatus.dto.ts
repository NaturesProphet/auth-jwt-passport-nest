import { IsEnum, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { enumUserStatus } from "../../users/enums/userStatus.enum";

enum EnumAccountTypes {
  ADMIN = 'admin'
}

export class EditAccountStatusDto {
  @ApiProperty( {
    example: 'admin',
    description: 'Tipo de conta de usuário'
  } )
  @IsEnum( EnumAccountTypes )
  accountType: 'admin';

  @IsNumber()
  @ApiProperty( {
    example: 1,
    description: 'ID da conta'
  } )
  userId: number;

  @ApiProperty( {
    example: 'active',
    description: 'Novo status a ser atribuído à conta'
  } )
  @IsEnum( enumUserStatus )
  status: 'active' | 'deleted' | 'suspended' | 'pendent'
}

