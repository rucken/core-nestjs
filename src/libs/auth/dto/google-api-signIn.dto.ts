import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GoogleApiSignInDto {
  @IsNotEmpty()
  @ApiModelProperty()
  code: string;
}
