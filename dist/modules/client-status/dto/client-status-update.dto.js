"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientStatusUpdateDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const client_status_create_dto_1 = require("./client-status-create.dto");
class ClientStatusUpdateDto extends (0, mapped_types_1.PartialType)(client_status_create_dto_1.ClientStatusCreateDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.ClientStatusUpdateDto = ClientStatusUpdateDto;
//# sourceMappingURL=client-status-update.dto.js.map