import { Controller, Get } from '@nestjs/common';
import { LanguageService } from '../../languages/language.service';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { Language } from '../../languages/language.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LanguageCreateDto } from './create.dto';
import { LanguageUpdateDto } from './update.dto';
import { LanguageDto } from './dto';
import { LanguageGetmanyDto } from './getmany.dto';
@ApiTags('Admin')
@ApiBearerAuth()
@Crud({
  model: {
    type: Language,
  },
  dto: {
    create: LanguageCreateDto,
    update: LanguageUpdateDto,
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
    getMany: LanguageGetmanyDto,
    create: LanguageDto,
    update: LanguageDto,
    get: LanguageDto,
  },
})
@Controller('api/v1/admin/languages')
export class LanguageController implements CrudController<Language> {
  constructor(public service: LanguageService) {}
  get base(): CrudController<Language> {
    return this;
  }

  @Override()
  // @UseRoles({
  //   resource: 'jobs',
  //   action: 'create',
  // })
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: LanguageCreateDto,
  ) {
    console.log('create-dto', dto);
    return this.base.createOneBase(req, <Language>dto);
  }

  @Override()
  // @UseRoles({
  //   resource: 'jobs',
  //   action: 'update',
  // })
  updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: LanguageUpdateDto,
  ) {
    return this.base.updateOneBase(req, <Language>dto);
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
