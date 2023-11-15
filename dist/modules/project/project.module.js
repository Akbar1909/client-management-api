"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModule = void 0;
const common_1 = require("@nestjs/common");
const project_service_1 = require("./project.service");
const project_controller_1 = require("./project.controller");
const ticket_module_1 = require("../ticket/ticket.module");
const ticket_side_module_1 = require("../ticket-side/ticket-side.module");
const ticket_type_module_1 = require("../ticket-type/ticket-type.module");
const client_status_module_1 = require("../client-status/client-status.module");
let ProjectModule = class ProjectModule {
};
exports.ProjectModule = ProjectModule;
exports.ProjectModule = ProjectModule = __decorate([
    (0, common_1.Module)({
        controllers: [project_controller_1.ProjectController],
        providers: [project_service_1.ProjectService],
        imports: [
            ticket_module_1.TicketModule,
            ticket_side_module_1.TicketSideModule,
            ticket_type_module_1.TicketTypeModule,
            client_status_module_1.ClientStatusModule,
        ],
    })
], ProjectModule);
//# sourceMappingURL=project.module.js.map