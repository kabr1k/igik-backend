import {
  Controller,
  HttpException,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ImageService } from './image.service';
import { User } from './user.entity';
const sharp = require('sharp');
const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);
@Controller()
export class PostAvatarController {
  constructor(private readonly imageService: ImageService) {}
  @Post('api/v1/profile/avatar')
  @ApiTags('Users')
  @ApiOperation({
    description:
      'Upload user avatar. Creates 3 resized images for a user. Returns user object populated with the images paths',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'File uploaded',
    type: User,
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
        destination: 'static/upload/avatars',
        filename: async function (req, file, cb) {
          const fileSize = parseInt(req.headers['content-length']);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const user = req.user.sub;
          const extension = file.originalname.split('.').pop();
          const filename = user.uuid + '.' + extension;
          try {
            await unlinkAsync('static' + user.avatarL);
          } catch (e) {}
          if (
            (file.mimetype === 'image/png' ||
              file.mimetype === 'image/jpg' ||
              file.mimetype === 'image/jpeg' ||
              file.mimetype === 'application/octet-stream') &&
            fileSize <= 1282810
          ) {
            cb(null, filename);
          } else {
            cb(null, '406');
          }
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
    switch (file.filename) {
      case '406':
        throw new HttpException(
          "We can't accept this photo. Please try again or choose another file.",
          406,
        );
      default:
        return await this.imageService.processImages(req.user.sub, file);
    }
  }
}
