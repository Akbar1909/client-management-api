import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class AuthGuard implements CanActivate {
    private readonly jwt;
    private readonly config;
    constructor(jwt: JwtService, config: ConfigService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean>;
    validateRequest(request: any): Promise<boolean>;
    private extractToken;
}
