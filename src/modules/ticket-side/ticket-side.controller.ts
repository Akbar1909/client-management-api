import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TicketSideService } from './ticket-side.service';
import { TicketSideCreateDto } from './dto/ticket-side-create.dto';
import { AuthGuard } from '../auth/guards';
import { TicketSideUpdateDto } from './dto';

@Controller('ticket-side')
@UseGuards(AuthGuard)
export class TicketModuleController {
  constructor(private readonly ticketSideService: TicketSideService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.ticketSideService.findAll();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createOne(@Body() dto: TicketSideCreateDto) {
    return this.ticketSideService.createOne(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  updateOne(
    @Body() dto: TicketSideUpdateDto,
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return {
      status: 'success',
      data: this.ticketSideService.updateOne(dto, id),
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
    return this.ticketSideService.deleteOne(id);
  }
}
