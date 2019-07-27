import { ApiModelProperty } from "@nestjs/swagger";

export class EmailDto {
  @ApiModelProperty()
  email: string;
}