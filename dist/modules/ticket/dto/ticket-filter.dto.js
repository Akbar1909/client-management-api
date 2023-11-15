"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketFilterDto = void 0;
const openapi = require("@nestjs/swagger");
const ticket_entity_1 = require("../ticket.entity");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class TicketFilterDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { page: { required: true, type: () => Number }, size: { required: true, type: () => Number }, clientId: { required: true, type: () => [Number] }, typeId: { required: true, type: () => [Number] }, developerId: { required: true, type: () => [Number] }, regDateGte: { required: false, type: () => String }, regDateLte: { required: false, type: () => String }, bugFixDateGte: { required: false, type: () => String }, bugFixDateLte: { required: false, type: () => String }, search: { required: false, type: () => String }, status: { required: false, enum: require("../ticket.entity").TicketStatus, isArray: true }, pcCountLte: { required: false, type: () => Number }, pcCountGte: { required: false, type: () => Number }, sideId: { required: false, type: () => [Number] }, regDateOrder: { required: false, type: () => Object }, bugFixDateOrder: { required: false, type: () => Object } };
    }
}
exports.TicketFilterDto = TicketFilterDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TicketFilterDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TicketFilterDto.prototype, "size", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], TicketFilterDto.prototype, "clientId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], TicketFilterDto.prototype, "typeId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], TicketFilterDto.prototype, "developerId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TicketFilterDto.prototype, "regDateGte", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TicketFilterDto.prototype, "regDateLte", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TicketFilterDto.prototype, "bugFixDateGte", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TicketFilterDto.prototype, "bugFixDateLte", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TicketFilterDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(ticket_entity_1.TicketStatus, { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], TicketFilterDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TicketFilterDto.prototype, "pcCountLte", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TicketFilterDto.prototype, "pcCountGte", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], TicketFilterDto.prototype, "sideId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TicketFilterDto.prototype, "regDateOrder", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TicketFilterDto.prototype, "bugFixDateOrder", void 0);
//# sourceMappingURL=ticket-filter.dto.js.map