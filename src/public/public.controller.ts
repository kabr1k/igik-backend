import { Controller, Get, Request, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Controller()
export class PublicController {
  constructor(private configService: ConfigService) {}
  @Get([
    '/',
    '/profile',
    '/category*',
    '/experts*',
    '/recover',
    '/privacy-policy',
    '/how-it-works',
    '/terms-of-service',
    '/stripe*',
    '/LxDCg4e',
  ])
  // @Get('*')
  @ApiTags('SSR routes')
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  async serveSSR(@Request() request, @Res({ passthrough: true }) response) {
    const dist = join(
      __dirname,
      '../../..',
      this.configService.get<string>('FRONTEND_PATH'),
    );
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const manifest = require(`${dist}/client/ssr-manifest.json`);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { default: renderPage } = require(`${dist}/server`);
    const url = request.protocol + '://' + request.get('host') + request.originalUrl;
    const { html, status, statusText } = await renderPage(url, {
      manifest,
      preload: true,
      request,
      response,
      // initialState: { ... } // <- This would also be available
    });
    return html;
  }
}
