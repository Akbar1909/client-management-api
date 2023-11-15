"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRefreshToken = void 0;
const common_1 = require("@nestjs/common");
exports.GetRefreshToken = (0, common_1.createParamDecorator)((_, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const refreshToken = request.headers['refresh_token'];
    return refreshToken;
});
//# sourceMappingURL=get-refresh-token.decorator.js.map