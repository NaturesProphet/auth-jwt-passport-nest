import { IsString, IsOptional, IsNumberString, IsDateString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { GenericQuery } from "../../common/DTOs/genericQuery.query";

export class listLogsQuery extends GenericQuery {
  @IsOptional()
  @IsString()
  @ApiProperty( {
    example: '/auth/admin',
    description: 'endpoint acessado',
    required: false
  } )
  endpoint: string;

  @IsOptional()
  @IsNumberString()
  @ApiProperty( {
    example: 1,
    description: 'ID do usuário',
    required: false
  } )
  userId: number;

  @IsOptional()
  @IsString()
  @ApiProperty( {
    example: 'admin',
    description: 'tipo de conta do usuário',
    required: false
  } )
  accountType: string

  @IsOptional()
  @IsDateString()
  @ApiProperty( {
    example: '1987-03-30T00:00:00.000Z',
    description: 'logs gerados antes da data especificada',
    required: false
  } )
  beforeDate: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty( {
    example: '1987-03-30T00:00:00.000Z',
    description: 'logs gerados após da data especificada',
    required: false
  } )
  afterDate: string;

  @IsOptional()
  @IsString()
  @ApiProperty( {
    example: 201,
    description: 'status da resposta',
    required: false
  } )
  response: number;

  @IsOptional()
  @IsString()
  @ApiProperty( {
    example: 5,
    description: 'IP do acesso',
    required: false
  } )
  ip: string;

  @IsOptional()
  @IsString()
  @ApiProperty( {
    example: 'POST',
    description: 'verbo HTTP utilizado',
    required: false
  } )
  method: string;

  @IsOptional()
  @IsString()
  @ApiProperty( {
    example: 'PostmanRuntime/7.20.1',
    description: 'ferramenta de acesso',
    required: false
  } )
  userAgent: string;
}
