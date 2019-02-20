import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FacebookTokenDto {
  @IsNotEmpty()
  @ApiModelProperty()
  access_token: string;
}
