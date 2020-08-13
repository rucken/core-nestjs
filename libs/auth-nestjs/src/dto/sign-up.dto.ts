import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(254)
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @MaxLength(128)
  @ApiProperty()
  password: string;

  @MaxLength(30)
  @IsOptional()
  firstName?: string = undefined;

  @MaxLength(30)
  @IsOptional()
  lastName?: string = undefined;
}
