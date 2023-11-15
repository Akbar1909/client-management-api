import {
  Controller,
  Body,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Delete,
  Param,
  ParseIntPipe,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketUpdateDto, TicketCreateDto } from './dto';
import { TicketFilterDto } from './dto/ticket-filter.dto';
import { AuthGuard } from '../auth/guards';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { UserEntity } from '../user/user.entity';
import { AuthEntity } from '../auth/auth.entity';
import { TicketDateReportDto } from './dto/ticket-date-report.dto';

@ApiTags('tickets')
@Controller('tickets')
@UseGuards(AuthGuard)
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() filterDto: TicketFilterDto, @User() user: AuthEntity) {
    return this.ticketService.findAll(filterDto, user);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() dto: TicketCreateDto, @User() user: UserEntity) {
    return this.ticketService.create(dto, user);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/stats/status')
  getStatsByStatus(
    @Query() filterDto: TicketFilterDto,
    @User() me: AuthEntity,
  ) {
    return this.ticketService.getStatsByStatus(filterDto, me);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/stats/type')
  getStatsByType(
    @Query(
      'clientId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    clientId: number,
  ) {
    return this.ticketService.getStatsByType(clientId);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/stats/client')
  getStatsByClient(
    @Query() filterDto: TicketFilterDto,
    @User() me: AuthEntity,
  ) {
    return this.ticketService.getStatsByClient(filterDto, me);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/stats/side')
  getStatsBySide(@Query() filterDto: TicketFilterDto, @User() me: AuthEntity) {
    return this.ticketService.getStatsBySide(filterDto, me);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/stats/dev')
  getStatsByDev(@Query() filterDto: TicketFilterDto, @User() me: AuthEntity) {
    return this.ticketService.getStatsByDev(filterDto, me);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/stats/module')
  getStatsByModule(@Query() query: TicketFilterDto, @User() me: AuthEntity) {
    return this.ticketService.getStatsByModule(query, me);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/stats/bug_report/count')
  getBugTicketCount(@User() user: AuthEntity) {
    return this.ticketService.getBugTicketsCount(user);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/stats/bug_report/side/count')
  getBugTicketCountsBySide(@User() user: AuthEntity) {
    return this.ticketService.getBugTicketCountBySide(user);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/stats/bug_report/module/count')
  getBugTicketCountsByModule(@User() user: AuthEntity) {
    return this.ticketService.getBugTicketCountByModule(user);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/stats/bug_report/client/count')
  getBugTicketCountsByClient() {
    return this.ticketService.getBugTicketCountByClient();
  }

  @HttpCode(HttpStatus.OK)
  @Get('/stats/bug_report/dev/count')
  getBugTicketCountsByDev() {
    return this.ticketService.getBugTicketCountByDev();
  }

  @HttpCode(HttpStatus.OK)
  @Get('/stats/bug_report/operator/count')
  getBugTicketCountsByOperator(@User() user: AuthEntity) {
    return this.ticketService.getBugTicketCountByOperator(user);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/stats/request/client/count')
  getRequestTicketsCountByClient() {
    return this.ticketService.getRequestTicketsCountByClient();
  }

  @HttpCode(HttpStatus.OK)
  @Get('/stats/bug_report/date-interval/count')
  getBugTicketsReportByInterval(
    @Query(
      new ValidationPipe({
        transform: true,
        forbidNonWhitelisted: true,
      }),
    )
    query: TicketDateReportDto,
    @User() user: AuthEntity,
  ) {
    return this.ticketService.getBugTicketsReportByInterval(query, user);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() dto: TicketUpdateDto,
  ) {
    return this.ticketService.updateOne(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.ticketService.deleteOne(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.ticketService.findOne(id);
  }
}
