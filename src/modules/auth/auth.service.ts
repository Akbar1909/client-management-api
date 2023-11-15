import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthSignInDto } from './dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/user.entity';
import { extractObjectPart } from 'src/utils/extract-object-part';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async signin(dto: AuthSignInDto) {
    // Check user exists
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username },
      include: {
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!user) {
      throw new HttpException('User not exist', HttpStatus.CONFLICT);
    }

    const passwordMatched = await bcrypt.compare(dto.password, user.hash);

    if (!passwordMatched) {
      throw new HttpException(`Password not matched`, HttpStatus.CONFLICT);
    }

    const { access_token, refresh_token } = await this.generateToken({
      id: user.id,
      username: user.username,
      role: user.role.name,
      orgId: user.orgId,
    });

    return {
      access_token,
      refresh_token,
    };
  }

  async refreshToken(userId: number, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        role: true,
      },
    });

    if (!user) {
      throw new HttpException(
        `User with the ${userId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!refreshToken) {
      throw new HttpException(
        'Refresh token is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const { access_token, refresh_token } = await this.generateToken({
      role: user.role.name,
      ...(extractObjectPart<UserEntity>({
        keys: ['id', 'username', 'orgId'],
        obj: user,
        type: 'include',
      }) as any),
    });

    await this.updateRefreshToken(userId, refreshToken);

    return {
      access_token,
      refresh_token,
    };
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    await this.prisma.user.update({ where: { id }, data: { refreshToken } });
  }

  async checkUserAlreadyExists(username: string) {
    return await this.prisma.user.findUnique({ where: { username } });
  }

  async generateToken({
    id,
    username,
    role,
    orgId,
  }: Pick<UserEntity, 'id' | 'username' | 'orgId'> & { role: string }) {
    const payload = {
      id,
      username,
      role,
      orgId,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwt.signAsync(payload, {
        expiresIn: this.config.get('JWT_ACCESS_TIME'),
        secret: this.config.get('ACCESS_TOKEN_SECRET'),
      }),
      this.jwt.signAsync(payload, {
        expiresIn: this.config.get('JWT_REFRESH_TIME'),
        secret: this.config.get('REFRESH_TOKEN_SECRET'),
      }),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }
}
