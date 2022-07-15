import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, HttpException } from "@nestjs/common";
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const response = {};
      for (const error of errors) {
        for (const key in error.constraints) {
          if (error.property === 'email') {
            response[error.property] = 'Value is not a valid email address';
          } else {
            response[error.property] = error.constraints[key];
          }
        }
      }
      throw new HttpException(response, 400);
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
