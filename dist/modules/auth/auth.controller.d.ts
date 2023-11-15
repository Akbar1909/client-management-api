import { AuthService } from './auth.service';
import { AuthSignInDto } from './dto';
import { AuthEntity } from './auth.entity';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signin(dto: AuthSignInDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    signout(): void;
    refresh(refreshToken: string, me: AuthEntity): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
