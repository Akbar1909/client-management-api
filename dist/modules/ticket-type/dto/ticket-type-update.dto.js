"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketTypeUpdateDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const ticket_type_create_dto_1 = require("./ticket-type-create.dto");
class TicketTypeUpdateDto extends (0, mapped_types_1.PartialType)(ticket_type_create_dto_1.TicketTypeCreateDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.TicketTypeUpdateDto = TicketTypeUpdateDto;
//# sourceMappingURL=ticket-type-update.dto.js.map