import { ApiModelProperty } from "@nestjs/swagger";

export class PerfilDto {
  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  perfil: string;
}