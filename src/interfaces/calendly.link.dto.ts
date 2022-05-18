import { ApiProperty } from '@nestjs/swagger';

export class CalendlyLinkDto {
  @ApiProperty()
  calendly_link: string;
}
