import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(254)
  @ApiModelProperty()
  email: string;

  @IsNotEmpty()
  @MaxLength(150)
  @ApiModelProperty()
  username: string;

  @IsNotEmpty()
  @MaxLength(128)
  @ApiModelProperty()
  password: string;

  @MaxLength(30)
  @IsOptional()
  firstName?: string = undefined;

  @MaxLength(30)
  @IsOptional()
  lastName?: string = undefined;
}
