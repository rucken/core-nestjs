import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GooglePlusSignInDto {
  @IsNotEmpty()
  @ApiModelProperty()
  code: string;
}
