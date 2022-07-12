import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Ticket } from './ticket.entity';
import { TicketsService } from './tickets.service';
import { TicketUpdateDto } from './ticket.update.dto';
import { JwtGuard } from "../auth/guards/jwt.guard";

@Controller()
export class CreateTicketController {
  constructor(private readonly ticketsService: TicketsService) {}
  @Post('api/v1/tickets/create')
  @ApiTags('Tickets')
  @ApiOperation({ description: 'Create ticket' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: Ticket,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, access denied',
  })
  @UseGuards(JwtGuard)
  async getUser(@Request() req, @Body() infoDto: TicketUpdateDto) {
    return await this.ticketsService.saveTicket(req.user.sub, infoDto.text);
  }
}
