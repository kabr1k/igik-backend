import { Controller, Get } from '@nestjs/common';
import { OrdersService } from '../../orders/orders.service';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { Order } from '../../orders/order.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderCreateDto } from './create.dto';
import { OrderUpdateDto } from './update.dto';
import { OrderDto } from './dto';
import { OrderGetmanyDto } from './getmany.dto';
@ApiTags('Admin')
@ApiBearerAuth()
@Crud({
  model: {
    type: Order,
  },
  dto: {
    create: OrderCreateDto,
    update: OrderUpdateDto,
  },
  params: {
    id: {
      field: 'id',
      type: 'number',
      primary: true,
    },
  },
  query: {
    alwaysPaginate: true,
    join: {
      buyer: {
        eager: true,
      },
      seller: {
        eager: true,
      },
    },
    sort: [
      {
        field: 'id',
        order: 'DESC',
      },
    ],
  },
  serialize: {
    getMany: OrderGetmanyDto,
    create: OrderDto,
    update: OrderDto,
    get: OrderDto,
  },
})
@Controller('api/v1/admin/orders')
export class OrderController implements CrudController<Order> {
  constructor(public service: OrdersService) {}
  get base(): CrudController<Order> {
    return this;
  }

  @Override()
  // @UseRoles({
  //   resource: 'jobs',
  //   action: 'create',
  // })
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: OrderCreateDto,
  ) {
    console.log('create-dto', dto);
    return this.base.createOneBase(req, <Order>dto);
  }

  @Override()
  // @UseRoles({
  //   resource: 'jobs',
  //   action: 'update',
  // })
  updateOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: OrderUpdateDto) {
    return this.base.updateOneBase(req, <Order>dto);
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
