"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleUpdateDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const role_create_dto_1 = require("./role-create.dto");
class RoleUpdateDto extends (0, mapped_types_1.PartialType)(role_create_dto_1.RoleCreateDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.RoleUpdateDto = RoleUpdateDto;
//# sourceMappingURL=role-update.dto.js.map