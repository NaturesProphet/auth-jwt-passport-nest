import { IsNumberString, IsOptional, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { GenericQuery } from "../../common/DTOs/genericQuery.query";
import { EnumPermissionOperation } from "../../users/permissions/enums/operation.enum";
import { EnumPermissionFeature } from "../../users/permissions/enums/feature.enum";

export class ListPermissionsQuery extends GenericQuery {
  @IsOptional()
  @IsEnum( EnumPermissionOperation )
  @ApiProperty( {
    example: 'edit',
    description: 'Uma ação válida',
    required: false
  } )
  operation: string;

  @IsOptional()
  @IsEnum( EnumPermissionFeature )
  @ApiProperty( {
    example: 'adminAccount',
    description: 'Um recurso válido do sistema',
    required: false
  } )
  feature: string;

  @IsOptional()
  @IsNumberString()
  @ApiProperty( {
    example: '1',
    description: 'ID de uma permissão existente',
    required: false
  } )
  id: number;
}
