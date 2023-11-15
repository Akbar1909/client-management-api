import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TicketTypeService } from './ticket-type.service';
import { TicketTypeCreateDto } from './dto';
import { TicketTypeUpdateDto } from './dto/ticket-type-update.dto';

@Controller('ticket-type')
@ApiTags('Ticket type')
export class TicketTypeController {
  constructor(private readonly ticketTypeService: TicketTypeService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.ticketTypeService.findAll();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() dto: TicketTypeCreateDto) {
    return this.ticketTypeService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateOne(
    @Body() dto: TicketTypeUpdateDto,
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return {
      status: 'success',
      data: this.ticketTypeService.updateOne(id, dto),
    };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.ticketTypeService.deleteOne(id);
  }
}
