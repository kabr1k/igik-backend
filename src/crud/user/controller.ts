import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { User } from '../../users/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserCreateDto } from './create.dto';
import { UserUpdateDto } from './update.dto';
import { UserDto } from './dto';
import { UserGetmanyDto } from './getmany.dto';
@ApiTags('Admin')
@ApiBearerAuth()
@Crud({
  model: {
    type: User,
  },
  dto: {
    create: UserCreateDto,
    update: UserUpdateDto,
  },
  params: {
    id: {
      field: 'uuid',
      type: 'string',
      primary: true,
    },
  },
  query: {
    alwaysPaginate: true,
    join: {
      postedOrders: {
        eager: true,
      },
      receivedOrders: {
        eager: true,
      },
      category: {
        eager: true,
      },
      languages: {
        eager: true,
      },
      location: {
        eager: true,
      },
      experience: {
        eager: true,
      },
      specialities: {
        eager: true,
      },
    },
    sort: [
      {
        field: 'uuid',
        order: 'DESC',
      },
    ],
  },
  serialize: {
    getMany: UserGetmanyDto,
    create: UserDto,
    update: UserDto,
    get: UserDto,
  },
})
@Controller('api/v1/admin/users')
export class UserController implements CrudController<User> {
  constructor(public service: UsersService) {}
  get base(): CrudController<User> {
    return this;
  }

  @Override()
  // @UseRoles({
  //   resource: 'jobs',
  //   action: 'create',
  // })
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UserCreateDto,
  ) {
    console.log('create-dto', dto);
    return this.base.createOneBase(req, <User>dto);
  }

  @Override()
  // @UseRoles({
  //   resource: 'jobs',
  //   action: 'update',
  // })
  updateOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: UserUpdateDto) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (dto.languages.uuid) {
      const normLangs = [];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      for (const lang of dto.languages.uuid) {
        normLangs.push({
          uuid: lang,
        });
      }
      dto.languages = normLangs;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (dto.specialities.uuid) {
      const normSpecs = [];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      for (const spec of dto.specialities.uuid) {
        normSpecs.push({
          uuid: spec,
        });
      }
      dto.specialities = normSpecs;
    }
    return this.base.updateOneBase(req, <User>dto);
  }

  @Override()
  // @UseRoles({
  //   resource: 'jobs',
  //   action: 'delete',
  // })
  deleteOne(@ParsedRequest() req: CrudRequest) {
    return this.base.deleteOneBase(req);
  }
}
