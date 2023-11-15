import { AuthSignInDto } from './dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/user.entity';
export declare class AuthService {
    private prisma;
    private config;
    private jwt;
    constructor(prisma: PrismaService, config: ConfigService, jwt: JwtService);
    signin(dto: AuthSignInDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    refreshToken(userId: number, refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    updateRefreshToken(id: number, refreshToken: string): Promise<void>;
    checkUserAlreadyExists(username: string): Promise<{
        id: number;
        username: string;
        hash: string;
        roleId: number;
        firstName: string;
        lastName: string;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        refreshToken: string | null;
        orgId: number | null;
    } | null>;
    generateToken({ id, username, role, orgId, }: Pick<UserEntity, 'id' | 'username' | 'orgId'> & {
        role: string;
    }): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
