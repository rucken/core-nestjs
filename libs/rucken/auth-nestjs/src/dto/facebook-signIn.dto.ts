import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FacebookSignInDto {
  @IsNotEmpty()
  @ApiModelProperty()
  code: string;
}
