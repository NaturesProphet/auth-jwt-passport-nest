import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsArray } from "class-validator";

export class CreateRoleDto {
  @IsString()
  @ApiProperty( {
    example: 'Admin 1',
    description: 'Nome para a nova Role'
  } )
  name: string;

  @IsString()
  @ApiProperty( {
    example: 'Role de testes, onde um admin pode editar e criar contas de admins',
    description: 'Descrição da nova role'
  } )
  description: string;

  @IsArray()
  @ApiProperty( {
    example: [ 1, 2 ],
    description: 'Lista de IDs das permissões a serem atribuídas à nova Role'
  } )
  permissions: number[];
}