import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './guards';
import { User } from 'src/decorators/user.decorator';
import { AuthEntity } from './auth.entity';
import { GetRefreshToken } from 'src/decorators/get-refresh-token.decorator';
import { RTGuard } from './guards/rt.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthSignInDto) {
    return this.authService.signin(dto);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  signout() {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(RTGuard)
  @Post('refresh')
  refresh(@GetRefreshToken() refreshToken: string, @User() me: AuthEntity) {
    return this.authService.refreshToken(me.id, refreshToken);
  }
}
