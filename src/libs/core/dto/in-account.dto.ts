import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsOptional, MaxLength } from 'class-validator';

export class InAccountDto {
  @IsOptional()
  id: number;

  @IsEmail()
  @MaxLength(254)
  @ApiModelProperty()
  email: string;

  @Exclude()
  @MaxLength(128)
  @IsOptional()
  @ApiModelPropertyOptional()
  password: string;

  @MaxLength(150)
  @ApiModelProperty()
  username: string;

  @MaxLength(30)
  @ApiModelProperty()
  firstName: string;

  @MaxLength(30)
  @ApiModelProperty()
  lastName: string;
}
