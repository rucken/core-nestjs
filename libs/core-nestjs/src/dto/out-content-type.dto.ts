import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ContentTypeDto } from '../dto/content-type.dto';
export class OutContentTypeDto {
  @Type(() => ContentTypeDto)
  @ApiProperty({ type: ContentTypeDto })
  contentType: ContentTypeDto;
}
