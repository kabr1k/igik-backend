import { Controller, Get } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { Ticket } from './ticket.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TicketCreateDto } from './ticket.create.dto';
import { TicketUpdateDto } from './ticket.update.dto';
import { TicketDto } from './ticket.dto';
import { TicketGetmanyDto } from './ticket.getmany.dto';
@ApiTags('Admin: Tickets')
@ApiBearerAuth()
@Crud({
  model: {
    type: Ticket,
  },
  dto: {
    create: TicketCreateDto,
    update: TicketUpdateDto,
  },
  params: {
    id: {
      field: 'uuid',
      type: 'number',
      primary: true,
    },
  },
  query: {
    alwaysPaginate: true,
    // join: {
    //   lender: {
    //     eager: true,
    //   },
    //   investor: {
    //     eager: true,
    //   },
    // },
    sort: [
      {
        field: 'uuid',
        order: 'DESC',
      },
    ],
  },
  serialize: {
    getMany: TicketGetmanyDto,
    create: TicketDto,
    update: TicketDto,
    get: TicketDto,
  },
})
@Controller('tickets')
export class TicketController implements CrudController<Ticket> {
  constructor(public service: TicketsService) {}
  get base(): CrudController<Ticket> {
    return this;
  }

  @Override()
  // @UseRoles({
  //   resource: 'jobs',
  //   action: 'create',
  // })
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: TicketCreateDto,
  ) {
    console.log('create-dto', dto);
    return this.base.createOneBase(req, <Ticket>dto);
  }

  @Override()
  // @UseRoles({
  //   resource: 'jobs',
  //   action: 'update',
  // })
  updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: TicketUpdateDto,
  ) {
    return this.base.updateOneBase(req, <Ticket>dto);
  }

  @Override()
  // @UseRoles({
  //   resource: 'jobs',
  //   action: 'delete',
  // })
  deleteOne(req: CrudRequest) {
    return this.base.deleteOneBase(req);
  }
}
