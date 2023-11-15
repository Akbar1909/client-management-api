"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientStatusModule = void 0;
const common_1 = require("@nestjs/common");
const client_status_controller_1 = require("./client-status.controller");
const client_status_service_1 = require("./client-status.service");
let ClientStatusModule = class ClientStatusModule {
};
exports.ClientStatusModule = ClientStatusModule;
exports.ClientStatusModule = ClientStatusModule = __decorate([
    (0, common_1.Module)({
        controllers: [client_status_controller_1.ClientStatusController],
        providers: [client_status_service_1.ClientStatusService],
        exports: [client_status_service_1.ClientStatusService],
    })
], ClientStatusModule);
//# sourceMappingURL=client-status.module.js.map