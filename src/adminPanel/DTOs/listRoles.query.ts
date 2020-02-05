import { IsNumberString, IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { GenericQuery } from "../../common/DTOs/genericQuery.query";

export class ListRolesQuery extends GenericQuery {
  @IsOptional()
  @IsString()
  @ApiProperty( {
    example: 'Admin 1',
    description: 'Nome de uma role',
    required: false
  } )
  name: string;

  @IsOptional()
  @IsNumberString()
  @ApiProperty( {
    example: '1',
    description: 'ID de uma role',
    required: false
  } )
  id: number;
}
