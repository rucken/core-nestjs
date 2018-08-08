import { IsEmail, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

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
