import { Controller, Get, Request } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
export class PublicController {
  constructor() {}
  @Get('')
  @ApiTags('Public routes')
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  getProfile(@Request() req) {
    return;
  }
}
