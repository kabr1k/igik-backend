import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Exclude, Type } from 'class-transformer';
import { User } from '../users/user.entity';

class UuidDto {
  @ApiProperty()
  readonly uuid: number;
}

@Exclude()
export class TicketDto {
  @Expose()
  @ApiPropertyOptional()
  topic: string;
  @Expose()
  @ApiPropertyOptional()
  text: string;
  @Expose()
  @ApiProperty({ type: () => UuidDto })
  user: User;
  @Expose()
  @ApiPropertyOptional()
  createdAt: string;
  @Expose()
  @ApiPropertyOptional()
  updatedAt: string;
}
