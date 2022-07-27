import { Controller, Get } from '@nestjs/common';
import { LocationService } from '../../location/location.service';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { Location } from '../../location/location.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LocationCreateDto } from './create.dto';
import { LocationUpdateDto } from './update.dto';
import { LocationDto } from './dto';
import { LocationGetmanyDto } from './getmany.dto';
@ApiTags('Admin')
@ApiBearerAuth()
@Crud({
  model: {
    type: Location,
  },
  dto: {
    create: LocationCreateDto,
    update: LocationUpdateDto,
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
    sort: [
      {
        field: 'uuid',
        order: 'DESC',
      },
    ],
  },
  serialize: {
    getMany: LocationGetmanyDto,
    create: LocationDto,
    update: LocationDto,
    get: LocationDto,
  },
})
@Controller('api/v1/admin/locations')
export class LocationController implements CrudController<Location> {
  constructor(public service: LocationService) {}
  get base(): CrudController<Location> {
    return this;
  }

  @Override()
  // @UseRoles({
  //   resource: 'jobs',
  //   action: 'create',
  // })
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: LocationCreateDto,
  ) {
    console.log('create-dto', dto);
    return this.base.createOneBase(req, <Location>dto);
  }

  @Override()
  // @UseRoles({
  //   resource: 'jobs',
  //   action: 'update',
  // })
  updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: LocationUpdateDto,
  ) {
    return this.base.updateOneBase(req, <Location>dto);
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
