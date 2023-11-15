import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Patch,
  Put,
  Param,
  ParseIntPipe,
  HttpStatus,
  Delete,
  HttpCode,
  Query,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { AuthGuard } from 'src/modules/auth/guards';
import {
  UpdateStatusDto,
  ClientCreateDto,
  ClientUpdateDto,
  ClientAllFilterDto,
} from './dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { UserEntity } from '../user/user.entity';

@ApiTags('clients')
@Controller('clients')
@UseGuards(AuthGuard)
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() query: ClientAllFilterDto, @User() user: UserEntity) {
    return this.clientService.findAll(query, user);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/stats/statusId/count')
  getStatsByStatusId(@Query() query: ClientAllFilterDto) {
    return this.clientService.getStatsByStatusId(query);
  }

  @HttpCode(HttpStatus.OK)
  @Get('contract-due-to/count')
  async getActiveClientsCount() {
    return this.clientService.getClientsCountByContractDate();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.clientService.findOne(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() dto: ClientCreateDto, @User() user: UserEntity) {
    return this.clientService.create(dto, user);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('update-status')
  updateStatus(@Body() dto: UpdateStatusDto) {
    return this.clientService.updateStatus(dto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Put(':id')
  update(
    @Body() dto: ClientUpdateDto,
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.clientService.update(id, dto);
  }

  @Get(':id/tickets')
  getTickets(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.clientService.getTickets(id);
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
    return this.clientService.delete(id);
  }
}
