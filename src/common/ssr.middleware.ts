import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SsrMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}
  use(request: Request, response: Response, next: NextFunction) {
    const { originalUrl } = request;
    if (
      originalUrl.indexOf('/personal') === 0 ||
      originalUrl.indexOf('/api') === 0
    ) {
      next();
    } else {
      const dist = join(
        __dirname,
        '../../..',
        this.configService.get<string>('FRONTEND_PATH'),
      );
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const manifest = require(`${dist}/client/ssr-manifest.json`);
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { default: renderPage } = require(`${dist}/server`);
      const url =
        request.protocol + '://' + request.get('host') + request.originalUrl;
      renderPage(url, {
        manifest,
        preload: true,
        request,
        response,
        // initialState: { ... } // <- This would also be available
      }).then(({ html, status, statusText }) => {
        response.end(html);
      });
    }
  }
}
