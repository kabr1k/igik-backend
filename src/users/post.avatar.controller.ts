import {
  Controller,
  Post, Req,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
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
export class PostAvatarController {
  constructor() {}
  @Post('profile/avatar')
  @ApiTags('Users')
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
        destination: 'static/upload/avatars',
        filename: function (req, file, cb) {
          // @ts-ignore
          const user = req.user.sub;
          const extension = file.originalname.split('.').pop();
          const filename = user.uuid + '.' + extension;
          cb(null, filename);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
    const user = req.user.sub;
    const extension = file.originalname.split('.').pop();
    const filename = user.uuid + '.' + extension;
    console.log(file);
  }
}
