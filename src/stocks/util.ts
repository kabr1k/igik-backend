import { Injectable } from '@nestjs/common';

@Injectable()
export class Util {
  public static async sleep(ms) {
    return new Promise((resolve) => {
      return setTimeout(resolve, ms);
    });
  }
}
