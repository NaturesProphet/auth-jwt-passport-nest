import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { EnumPermissionOperation } from "../../users/permissions/enums/operation.enum";
import { EnumPermissionFeature } from "../../users/permissions/enums/feature.enum";

export class CreatePermissionDto {
  @IsEnum( EnumPermissionOperation )
  @ApiProperty( {
    example: 'edit',
    description: 'Ação do usuário'
  } )
  operation: string;

  @IsEnum( EnumPermissionFeature )
  @ApiProperty( {
    example: 'adminAccount',
    description: 'Uma funcionalidade do sistema, como contas de administradores. '
      + '(Neste exemplo, estamos criando uma permissão para editar contas de administradores)'
  } )
  feature: string;
}
