import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @MaxLength(150)
  @ApiModelProperty()
  email: string;

  @IsNotEmpty()
  @MaxLength(128)
  @ApiModelProperty()
  password: string;
}
