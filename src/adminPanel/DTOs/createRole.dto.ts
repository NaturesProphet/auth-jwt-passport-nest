import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsArray } from "class-validator";

export class CreateRoleDto {
  @IsString()
  @ApiProperty( {
    example: 'Admin 1',
    description: 'Nome para a nova Role'
  } )
  name: string;

  @IsArray()
  @ApiProperty( {
    example: [ 1, 2 ],
    description: 'Lista de IDs das permissões a serem atribuídas à nova Role'
  } )
  permissions: number[];
}