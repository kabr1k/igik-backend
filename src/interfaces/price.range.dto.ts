import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class PriceRangeDto {
  @ApiPropertyOptional()
  min: number;
  @ApiPropertyOptional()
  max: number;
}
