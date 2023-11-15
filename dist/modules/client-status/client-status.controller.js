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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientStatusController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const client_status_service_1 = require("./client-status.service");
const guards_1 = require("../auth/guards");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./dto");
let ClientStatusController = class ClientStatusController {
    constructor(clientStatusService) {
        this.clientStatusService = clientStatusService;
    }
    findAll() {
        return this.clientStatusService.findAll();
    }
    create(dto) {
        return this.clientStatusService.createOne(dto);
    }
    updateOne(dto, id) {
        return {
            status: 'success',
            data: this.clientStatusService.updateOne(dto, id),
        };
    }
    deleteOne(id) {
        return this.clientStatusService.deleteOne(id);
    }
};
exports.ClientStatusController = ClientStatusController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClientStatusController.prototype, "findAll", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ClientStatusCreateDto]),
    __metadata("design:returntype", void 0)
], ClientStatusController.prototype, "create", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', new common_1.ParseIntPipe({ errorHttpStatusCode: common_1.HttpStatus.NOT_ACCEPTABLE }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ClientStatusCreateDto, Number]),
    __metadata("design:returntype", void 0)
], ClientStatusController.prototype, "updateOne", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe({ errorHttpStatusCode: common_1.HttpStatus.NOT_ACCEPTABLE }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ClientStatusController.prototype, "deleteOne", null);
exports.ClientStatusController = ClientStatusController = __decorate([
    (0, swagger_1.ApiTags)('Client Status'),
    (0, common_1.Controller)('client-status'),
    (0, common_1.UseGuards)(guards_1.AuthGuard),
    __metadata("design:paramtypes", [client_status_service_1.ClientStatusService])
], ClientStatusController);
//# sourceMappingURL=client-status.controller.js.map