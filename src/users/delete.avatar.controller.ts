import {
  Controller, Delete,
  Post, Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
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

@Controller()
export class DeleteAvatarController {
  constructor(private readonly imageService: ImageService) {}
  @Delete('api/v1/profile/avatar')
  @ApiTags('Users')
  @ApiOperation({
    description:
      'Upload user avatar. Creates 3 resized images for a user. Returns user object populated with the images paths',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Avatar removed',
    type: User,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, access denied',
  })
  @UseGuards(JwtGuard)
  async deleteAvatar(@Req() req) {
    return await this.imageService.deleteAvatar(req.user.sub);
  }
}
