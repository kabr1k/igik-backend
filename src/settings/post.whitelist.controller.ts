import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller()
export class PostWhitelistController {
  constructor() {}
  @Post('whitelist')
  @ApiTags('Settings API')
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'File uploaded',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, access denied',
  })
  @UseGuards(JwtGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'upload/proofs/',
        filename: function (req, file, cb) {
          cb(null, 'data.json');
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
