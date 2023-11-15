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
exports.TicketController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const ticket_service_1 = require("./ticket.service");
const dto_1 = require("./dto");
const ticket_filter_dto_1 = require("./dto/ticket-filter.dto");
const guards_1 = require("../auth/guards");
const swagger_1 = require("@nestjs/swagger");
const user_decorator_1 = require("../../decorators/user.decorator");
const ticket_date_report_dto_1 = require("./dto/ticket-date-report.dto");
let TicketController = class TicketController {
    constructor(ticketService) {
        this.ticketService = ticketService;
    }
    findAll(filterDto, user) {
        return this.ticketService.findAll(filterDto, user);
    }
    create(dto, user) {
        return this.ticketService.create(dto, user);
    }
    getStatsByStatus(filterDto, me) {
        return this.ticketService.getStatsByStatus(filterDto, me);
    }
    getStatsByType(clientId) {
        return this.ticketService.getStatsByType(clientId);
    }
    getStatsByClient(filterDto, me) {
        return this.ticketService.getStatsByClient(filterDto, me);
    }
    getStatsBySide(filterDto, me) {
        return this.ticketService.getStatsBySide(filterDto, me);
    }
    getStatsByDev(filterDto, me) {
        return this.ticketService.getStatsByDev(filterDto, me);
    }
    getStatsByModule(query, me) {
        return this.ticketService.getStatsByModule(query, me);
    }
    getBugTicketCount(user) {
        return this.ticketService.getBugTicketsCount(user);
    }
    getBugTicketCountsBySide(user) {
        return this.ticketService.getBugTicketCountBySide(user);
    }
    getBugTicketCountsByModule(user) {
        return this.ticketService.getBugTicketCountByModule(user);
    }
    getBugTicketCountsByClient() {
        return this.ticketService.getBugTicketCountByClient();
    }
    getBugTicketCountsByDev() {
        return this.ticketService.getBugTicketCountByDev();
    }
    getBugTicketCountsByOperator(user) {
        return this.ticketService.getBugTicketCountByOperator(user);
    }
    getRequestTicketsCountByClient() {
        return this.ticketService.getRequestTicketsCountByClient();
    }
    getBugTicketsReportByInterval(query, user) {
        return this.ticketService.getBugTicketsReportByInterval(query, user);
    }
    update(id, dto) {
        return this.ticketService.updateOne(id, dto);
    }
    delete(id) {
        return this.ticketService.deleteOne(id);
    }
    findOne(id) {
        return this.ticketService.findOne(id);
    }
};
exports.TicketController = TicketController;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ticket_filter_dto_1.TicketFilterDto, Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "findAll", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TicketCreateDto, Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "create", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('/stats/status'),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ticket_filter_dto_1.TicketFilterDto, Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "getStatsByStatus", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('/stats/type'),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Query)('clientId', new common_1.ParseIntPipe({ errorHttpStatusCode: common_1.HttpStatus.NOT_ACCEPTABLE }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "getStatsByType", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('/stats/client'),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ticket_filter_dto_1.TicketFilterDto, Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "getStatsByClient", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('/stats/side'),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ticket_filter_dto_1.TicketFilterDto, Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "getStatsBySide", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('/stats/dev'),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ticket_filter_dto_1.TicketFilterDto, Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "getStatsByDev", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('/stats/module'),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ticket_filter_dto_1.TicketFilterDto, Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "getStatsByModule", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('/stats/bug_report/count'),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "getBugTicketCount", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('/stats/bug_report/side/count'),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "getBugTicketCountsBySide", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('/stats/bug_report/module/count'),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "getBugTicketCountsByModule", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('/stats/bug_report/client/count'),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "getBugTicketCountsByClient", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('/stats/bug_report/dev/count'),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "getBugTicketCountsByDev", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('/stats/bug_report/operator/count'),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "getBugTicketCountsByOperator", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('/stats/request/client/count'),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "getRequestTicketsCountByClient", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('/stats/bug_report/date-interval/count'),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({
        transform: true,
        forbidNonWhitelisted: true,
    }))),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ticket_date_report_dto_1.TicketDateReportDto, Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "getBugTicketsReportByInterval", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Put)(':id'),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe({ errorHttpStatusCode: common_1.HttpStatus.NOT_ACCEPTABLE }))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.TicketUpdateDto]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "update", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe({ errorHttpStatusCode: common_1.HttpStatus.NOT_ACCEPTABLE }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "delete", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe({ errorHttpStatusCode: common_1.HttpStatus.NOT_ACCEPTABLE }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "findOne", null);
exports.TicketController = TicketController = __decorate([
    (0, swagger_1.ApiTags)('tickets'),
    (0, common_1.Controller)('tickets'),
    (0, common_1.UseGuards)(guards_1.AuthGuard),
    __metadata("design:paramtypes", [ticket_service_1.TicketService])
], TicketController);
//# sourceMappingURL=ticket.controller.js.map