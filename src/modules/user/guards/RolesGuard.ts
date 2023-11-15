import { Observable } from 'rxjs';
import { CanActivate, ExecutionContext } from '@nestjs/common';

export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return true;
  }
}
