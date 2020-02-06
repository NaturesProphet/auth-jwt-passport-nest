import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsArray } from "class-validator";

export class EditPermissionsFromRole {
  @ApiProperty( {
    example: 1,
    description: 'ID da Role a ser editada'
  } )
  @IsNumber()
  role: number;

  @IsArray()
  @ApiProperty( {
    example: [ 1, 2, 3, 4 ],
    description: 'Lista com os IDs das permissões'
  } )
  permissions: number[]
}
