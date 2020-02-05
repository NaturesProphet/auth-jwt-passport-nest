import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsNumberString } from "class-validator";

export class GenericQuery {
  @IsOptional()
  @IsNumberString()
  @ApiProperty( {
    example: '1',
    description: 'Página da pesquisa',
    required: false
  } )
  page: number;

  @IsOptional()
  @IsNumberString()
  @ApiProperty( {
    example: '10',
    description: 'limite de itens por página',
    required: false
  } )
  limit: number;
}
