import { ApiModelProperty } from "@nestjs/swagger";

export class loginDto {
  @ApiModelProperty()
  username: string;

  @ApiModelProperty()
  password: string;
}
