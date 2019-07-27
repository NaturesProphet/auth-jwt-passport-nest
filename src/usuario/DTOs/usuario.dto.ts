import { ApiModelProperty } from "@nestjs/swagger";

export class UsuarioDto {
  @ApiModelProperty()
  nome: string;

  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  senha: string;
}