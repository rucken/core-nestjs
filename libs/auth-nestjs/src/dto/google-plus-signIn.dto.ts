import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GooglePlusSignInDto {
  @IsNotEmpty()
  @ApiProperty()
  code: string;
}
