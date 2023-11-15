import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Param,
  ParseIntPipe,
  Delete,
  Put,
} from '@nestjs/common';
import { ClientStatusService } from './client-status.service';
import { AuthGuard } from '../auth/guards';
import { ApiTags } from '@nestjs/swagger';
import { ClientStatusCreateDto } from './dto';

@ApiTags('Client Status')
@Controller('client-status')
@UseGuards(AuthGuard)
export class ClientStatusController {
  constructor(private readonly clientStatusService: ClientStatusService) {}

  @Get()
  findAll() {
    return this.clientStatusService.findAll();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() dto: ClientStatusCreateDto) {
    return this.clientStatusService.createOne(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateOne(
    @Body() dto: ClientStatusCreateDto,
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return {
      status: 'success',
      data: this.clientStatusService.updateOne(dto, id),
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
    return this.clientStatusService.deleteOne(id);
  }
}
