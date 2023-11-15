import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionCreateDto, PermissionUpdateDto } from './dto';
import { AuthGuard } from '../auth/guards';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('permissions')
@Controller('permissions')
@UseGuards(AuthGuard)
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.permissionService.findAll();
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
    return this.permissionService.findOne(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createPermission(@Body() dto: PermissionCreateDto) {
    return this.permissionService.createPermission(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updatePermission(
    @Body() dto: PermissionUpdateDto,
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.permissionService.updatePermissionRoles(dto, id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deletePermission(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.permissionService.deletePermission(id);
  }
}
