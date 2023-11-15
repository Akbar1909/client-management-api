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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientAllFilterDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const order_1 = __importDefault(require("../../../dto/order"));
class ClientAllFilterDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { search: { required: false, type: () => String }, select: { required: false, type: () => Number }, contractDueToGte: { required: false, type: () => String }, contractDueToLte: { required: false, type: () => String }, totalTickets: { required: false, enum: require("../../../dto/order").default }, pcCount: { required: false, enum: require("../../../dto/order").default }, statusId: { required: false, type: () => [Number] }, page: { required: false, type: () => Number }, size: { required: false, type: () => Number } };
    }
}
exports.ClientAllFilterDto = ClientAllFilterDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClientAllFilterDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], ClientAllFilterDto.prototype, "select", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClientAllFilterDto.prototype, "contractDueToGte", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClientAllFilterDto.prototype, "contractDueToLte", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(order_1.default),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClientAllFilterDto.prototype, "totalTickets", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(order_1.default),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClientAllFilterDto.prototype, "pcCount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], ClientAllFilterDto.prototype, "statusId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ClientAllFilterDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ClientAllFilterDto.prototype, "size", void 0);
//# sourceMappingURL=client-all-filter.dto.js.map