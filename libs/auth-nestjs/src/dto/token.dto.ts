import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty()
  @IsNotEmpty()
  token: string;
}
