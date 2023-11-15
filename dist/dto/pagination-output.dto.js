"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationOutputDto = void 0;
const openapi = require("@nestjs/swagger");
class PaginationOutputDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true }, meta: { required: true, type: () => ({ total: { required: true, type: () => Number }, lastPage: { required: true, type: () => Number }, currentPage: { required: true, type: () => Number }, perPage: { required: true, type: () => Number }, prev: { required: true, type: () => Number, nullable: true }, next: { required: true, type: () => Number, nullable: true } }) } };
    }
}
exports.PaginationOutputDto = PaginationOutputDto;
//# sourceMappingURL=pagination-output.dto.js.map