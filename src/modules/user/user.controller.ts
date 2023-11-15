import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Put,
  Param,
  ParseIntPipe,
  Get,
  Patch,
  UseGuards,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  UserCreateDto,
  UserFindAllQueryParamsDto,
  UserUpdateDto,
  UserUpdateRoleDto,
} from './dto';
import { AuthGuard } from '../auth/guards';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { UserEntity } from './user.entity';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() query: UserFindAllQueryParamsDto) {
    return this.userService.findAll(query);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/me')
  @UseGuards(AuthGuard)
  findMe(@User() me: UserEntity) {
    return this.userService.findMe(me);
  }

  @Get('/options')
  findOptions() {
    return this.userService.findOptions();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.userService.findOne(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() dto: UserCreateDto) {
    return this.userService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Put()
  @UseGuards(AuthGuard)
  update(@Body() dto: UserUpdateDto) {
    return this.userService.update(dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.userService.deleteUser(id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id/role')
  @UseGuards(AuthGuard)
  updateRole(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body()
    dto: UserUpdateRoleDto,
  ) {
    return this.userService.updateRole(id, dto);
  }
}
