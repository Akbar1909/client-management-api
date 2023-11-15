"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = void 0;
class RolesGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        return true;
    }
}
exports.RolesGuard = RolesGuard;
//# sourceMappingURL=RolesGuard.js.map