import { Controller, Get, Request, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import path, { join } from 'path';
import { Response } from 'express';

@Controller()
export class PersonalController {
  constructor(private configService: ConfigService) {}
  @Get('/personal*')
  @ApiTags('SSR routes')
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  async serve(@Request() request, @Res({ passthrough: true }) response) {
    response.sendFile(
      join(
        __dirname,
        '../..',
        this.configService.get('PRIVATE_PATH') + '/index.html',
      ),
    );
  }
}
