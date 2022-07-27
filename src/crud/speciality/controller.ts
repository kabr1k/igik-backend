import { Controller, Get } from '@nestjs/common';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { Speciality } from '../../speciality/speciality.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SpecialityCreateDto } from './create.dto';
import { SpecialityUpdateDto } from './update.dto';
import { SpecialityDto } from './dto';
import { SpecialityGetmanyDto } from './getmany.dto';
import { SpecialityService } from "../../speciality/speciality.service";
@ApiTags('Admin')
@ApiBearerAuth()
@Crud({
  model: {
    type: Speciality,
  },
  dto: {
    create: SpecialityCreateDto,
    update: SpecialityUpdateDto,
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
    getMany: SpecialityGetmanyDto,
    create: SpecialityDto,
    update: SpecialityDto,
    get: SpecialityDto,
  },
})
@Controller('api/v1/admin/specialities')
export class SpecialityController implements CrudController<Speciality> {
  constructor(public service: SpecialityService) {}
  get base(): CrudController<Speciality> {
    return this;
  }

  @Override()
  // @UseRoles({
  //   resource: 'jobs',
  //   action: 'create',
  // })
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: SpecialityCreateDto,
  ) {
    console.log('create-dto', dto);
    return this.base.createOneBase(req, <Speciality>dto);
  }

  @Override()
  // @UseRoles({
  //   resource: 'jobs',
  //   action: 'update',
  // })
  updateOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: SpecialityUpdateDto) {
    return this.base.updateOneBase(req, <Speciality>dto);
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
