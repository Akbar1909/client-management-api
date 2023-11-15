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
exports.TicketModuleController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const ticket_side_service_1 = require("./ticket-side.service");
const ticket_side_create_dto_1 = require("./dto/ticket-side-create.dto");
const guards_1 = require("../auth/guards");
const dto_1 = require("./dto");
let TicketModuleController = class TicketModuleController {
    constructor(ticketSideService) {
        this.ticketSideService = ticketSideService;
    }
    findAll() {
        return this.ticketSideService.findAll();
    }
    createOne(dto) {
        return this.ticketSideService.createOne(dto);
    }
    updateOne(dto, id) {
        return {
            status: 'success',
            data: this.ticketSideService.updateOne(dto, id),
        };
    }
    deleteOne(id) {
        return this.ticketSideService.deleteOne(id);
    }
};
exports.TicketModuleController = TicketModuleController;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TicketModuleController.prototype, "findAll", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ticket_side_create_dto_1.TicketSideCreateDto]),
    __metadata("design:returntype", void 0)
], TicketModuleController.prototype, "createOne", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', new common_1.ParseIntPipe({ errorHttpStatusCode: common_1.HttpStatus.NOT_ACCEPTABLE }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TicketSideUpdateDto, Number]),
    __metadata("design:returntype", void 0)
], TicketModuleController.prototype, "updateOne", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe({ errorHttpStatusCode: common_1.HttpStatus.NOT_ACCEPTABLE }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TicketModuleController.prototype, "deleteOne", null);
exports.TicketModuleController = TicketModuleController = __decorate([
    (0, common_1.Controller)('ticket-side'),
    (0, common_1.UseGuards)(guards_1.AuthGuard),
    __metadata("design:paramtypes", [ticket_side_service_1.TicketSideService])
], TicketModuleController);
//# sourceMappingURL=ticket-side.controller.js.map