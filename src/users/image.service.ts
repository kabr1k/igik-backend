import { Injectable } from '@nestjs/common';
const sharp = require('sharp');
import { ConfigService } from '@nestjs/config';
import { UsersService } from './users.service';

@Injectable()
export class ImageService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}
  private widthS = 150;
  private widthM = 300;
  private async resize(user, file, width, height) {
    const extension = file.originalname.split('.').pop();
    const filename = 'static/upload/avatars/' + user.uuid + '.' + extension;
    const outputFilename =
      'static/upload/avatars/' +
      user.uuid +
      '-' +
      width.toString() +
      '.' +
      extension;
    try {
      await sharp(filename)
        .resize({
          width,
          height,
        })
        .toFile(outputFilename);
    } catch (error) {
      console.log(error);
    }
  }
  public async processImages(user, file) {
    await this.resize(user, file, this.widthS, this.widthS);
    await this.resize(user, file, this.widthM, this.widthM);
    const extension = file.originalname.split('.').pop();
    const avatarL = '/upload/avatars/' + user.uuid + '.' + extension;
    const avatarS =
      '/upload/avatars/' + user.uuid + '-' + this.widthS + '.' + extension;
    const avatarM =
      '/upload/avatars/' + user.uuid + '-' + this.widthM + '.' + extension;
    const images = {
      avatarS,
      avatarM,
      avatarL,
    };
    await this.usersService.saveUser({ uuid: user.uuid, ...images });
  }
}
