import { ApiProperty } from '@nestjs/swagger';
export class RedirectUriDto {
  @ApiProperty()
  redirect_uri: string;
}
