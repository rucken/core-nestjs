import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiModelProperty()
  @IsNotEmpty()
  token: string;
}
