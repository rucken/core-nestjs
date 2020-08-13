import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @MaxLength(128)
  @ApiProperty()
  password: string;
}
