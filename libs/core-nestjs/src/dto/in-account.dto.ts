import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsOptional, MaxLength } from 'class-validator';

export class InAccountDto {
  @IsOptional()
  id: number;

  @IsEmail()
  @MaxLength(254)
  @ApiProperty()
  email: string;

  @Exclude()
  @MaxLength(128)
  @IsOptional()
  @ApiPropertyOptional()
  password: string;

  @MaxLength(150)
  @ApiProperty()
  username: string;

  @MaxLength(30)
  @ApiProperty()
  firstName: string;

  @MaxLength(30)
  @ApiProperty()
  lastName: string;
}
