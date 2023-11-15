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
import { RoleCreateDto } from './dto/role-create.dto';
import { RoleService } from './role.service';
import { RoleUpdateDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('roles')
@Controller('roles')
// @UseGuards(AuthGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() dto: RoleCreateDto) {
    return this.roleService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateRole(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() dto: RoleUpdateDto,
  ) {
    return this.roleService.updateRole(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteRole(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.roleService.deleteRole(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getRoleFullInfo(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.roleService.getRoleFullInfo(id);
  }
}
