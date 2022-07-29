import { Controller, Get } from '@nestjs/common';
import { ExperienceService } from '../../experience/experience.service';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { Experience } from '../../experience/experience.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ExperienceCreateDto } from './create.dto';
import { ExperienceUpdateDto } from './update.dto';
import { ExperienceDto } from './dto';
import { ExperienceGetmanyDto } from './getmany.dto';
@ApiTags('Admin')
@ApiBearerAuth()
@Crud({
  model: {
    type: Experience,
  },
  dto: {
    create: ExperienceCreateDto,
    update: ExperienceUpdateDto,
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
        field: 'name',
        order: 'ASC',
      },
    ],
  },
  serialize: {
    getMany: ExperienceGetmanyDto,
    create: ExperienceDto,
    update: ExperienceDto,
    get: ExperienceDto,
  },
})
@Controller('api/v1/admin/experiences')
export class ExperienceController implements CrudController<Experience> {
  constructor(public service: ExperienceService) {}
  get base(): CrudController<Experience> {
    return this;
  }

  @Override()
  // @UseRoles({
  //   resource: 'jobs',
  //   action: 'create',
  // })
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: ExperienceCreateDto,
  ) {
    console.log('create-dto', dto);
    return this.base.createOneBase(req, <Experience>dto);
  }

  @Override()
  // @UseRoles({
  //   resource: 'jobs',
  //   action: 'update',
  // })
  updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: ExperienceUpdateDto,
  ) {
    return this.base.updateOneBase(req, <Experience>dto);
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
