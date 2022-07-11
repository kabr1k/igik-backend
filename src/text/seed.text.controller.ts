import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TextService } from './text.service';

@Controller()
export class SeedTextController {
  constructor(private readonly textService: TextService) {}
  @Get('text/seed')
  @ApiTags('SEO')
  @ApiOperation({
    description: 'Seed default texts to DB. Use only in dev environment',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  async find() {
    return await this.textService.seed();
  }
}
