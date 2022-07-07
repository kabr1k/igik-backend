import { Controller, Get, Request, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Controller()
export class PublicController {
  constructor(private configService: ConfigService) {}
  @Get('*')
  @ApiTags('SSR routes')
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  async getProfile(@Request() request, @Res({ passthrough: true }) response) {
    const dist = join(
      __dirname,
      '../../..',
      this.configService.get<string>('FRONTEND_PATH'),
    );
    // The manifest is required for preloading assets
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const manifest = require(`${dist}/client/ssr-manifest.json`);

    // This is the server renderer we just built
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { default: renderPage } = require(`${dist}/server`);
    const url = request.protocol + '://' + request.get('host') + request.originalUrl;
    console.log(url);
    const { html, status, statusText } = await renderPage(url, {
      manifest,
      preload: true,
      // Anything passed here will be available in the main hook
      request,
      response,
      // initialState: { ... } // <- This would also be available
    });
    // response.type('html');
    // response.writeHead(status || 200, statusText || headers, headers);
    // response.end(html);
    return html;
  }
}
