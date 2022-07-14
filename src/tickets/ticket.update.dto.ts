import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '../users/user.entity';

class UuidDto {
  @ApiProperty()
  readonly uuid: string;
}

export class TicketUpdateDto {
  @ApiPropertyOptional()
  uuid?: number;
  @ApiPropertyOptional()
  topic: string;
  @ApiPropertyOptional()
  text: string;
  @ApiProperty({ type: () => UuidDto })
  user: User;
  @ApiPropertyOptional()
  createdAt: string;
  @ApiPropertyOptional()
  updatedAt: string;
}
