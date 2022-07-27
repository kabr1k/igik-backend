import { Controller, Get } from '@nestjs/common';
import { CategoryService } from '../../category/category.service';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { Category } from '../../category/category.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CategoryCreateDto } from './create.dto';
import { CategoryUpdateDto } from './update.dto';
import { CategoryDto } from './dto';
import { CategoryGetmanyDto } from './getmany.dto';
@ApiTags('Admin')
@ApiBearerAuth()
@Crud({
  model: {
    type: Category,
  },
  dto: {
    create: CategoryCreateDto,
    update: CategoryUpdateDto,
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
    getMany: CategoryGetmanyDto,
    create: CategoryDto,
    update: CategoryDto,
    get: CategoryDto,
  },
})
@Controller('api/v1/admin/categories')
export class CategoryController implements CrudController<Category> {
  constructor(public service: CategoryService) {}
  get base(): CrudController<Category> {
    return this;
  }

  @Override()
  // @UseRoles({
  //   resource: 'jobs',
  //   action: 'create',
  // })
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CategoryCreateDto,
  ) {
    console.log('create-dto', dto);
    return this.base.createOneBase(req, <Category>dto);
  }

  @Override()
  // @UseRoles({
  //   resource: 'jobs',
  //   action: 'update',
  // })
  updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CategoryUpdateDto,
  ) {
    return this.base.updateOneBase(req, <Category>dto);
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
