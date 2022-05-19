import { ApiProperty, PartialType } from "@nestjs/swagger";

export class MentorSettings {
  @ApiProperty()
  calendly_link: string;
  @ApiProperty()
  event_price: string;
}
export class MentorSettingsDto extends PartialType(MentorSettings) {}
