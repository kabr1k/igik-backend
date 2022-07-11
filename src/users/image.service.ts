const sharp = require('sharp');
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './users.service';
const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

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
    let result;
    try {
      result = await sharp(filename)
        .resize({
          width,
          height,
        })
        .toFile(outputFilename);
    } catch (error) {
      console.log(error);
    }
    console.log(result);
  }
  public async processImages({ uuid }, file) {
    const user = await this.usersService.findByUuid(uuid);
    if (user.avatarS) {
      await unlinkAsync('static' + user.avatarS);
      await unlinkAsync('static' + user.avatarM);
    }
    const s = await this.resize(user, file, this.widthS, this.widthS);
    const m = await this.resize(user, file, this.widthM, this.widthM);
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
    return await this.usersService.findByUuid(user.uuid);
  }
  public async deleteAvatar({ uuid }) {
    const user = await this.usersService.findByUuid(uuid);
    await unlinkAsync('static' + user.avatarS);
    await unlinkAsync('static' + user.avatarM);
    await unlinkAsync('static' + user.avatarL);
    await this.usersService.saveUser({
      uuid,
      avatarS: null,
      avatarM: null,
      avatarL: null,
    });
    return await this.usersService.findByUuid(uuid);
  }
}
