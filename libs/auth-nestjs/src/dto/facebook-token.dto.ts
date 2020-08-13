import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FacebookTokenDto {
  @IsNotEmpty()
  @ApiProperty()
  access_token: string;
}
