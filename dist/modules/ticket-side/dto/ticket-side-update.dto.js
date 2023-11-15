"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketSideUpdateDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const ticket_side_create_dto_1 = require("./ticket-side-create.dto");
class TicketSideUpdateDto extends (0, mapped_types_1.PartialType)(ticket_side_create_dto_1.TicketSideCreateDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.TicketSideUpdateDto = TicketSideUpdateDto;
//# sourceMappingURL=ticket-side-update.dto.js.map