import { ApiModelProperty } from '@nestjs/swagger';
export class RedirectUriDto {
  @ApiModelProperty()
  redirect_uri: string;
}
