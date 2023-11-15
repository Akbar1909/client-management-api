"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientUpdateDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const client_create_dto_1 = require("./client-create.dto");
class ClientUpdateDto extends (0, mapped_types_1.PartialType)(client_create_dto_1.ClientCreateDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.ClientUpdateDto = ClientUpdateDto;
//# sourceMappingURL=client-update.dto.js.map