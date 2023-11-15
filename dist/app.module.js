"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const config_2 = require("./config");
const prisma_module_1 = require("./modules/prisma/prisma.module");
const auth_module_1 = require("./modules/auth/auth.module");
const client_module_1 = require("./modules/client/client.module");
const user_module_1 = require("./modules/user/user.module");
const user_service_1 = require("./modules/user/user.service");
const ticket_module_1 = require("./modules/ticket/ticket.module");
const role_module_1 = require("./modules/role/role.module");
const permission_module_1 = require("./modules/permission/permission.module");
const core_1 = require("@nestjs/core");
const http_exception_filter_1 = require("./global-filters/http-exception.filter");
const client_status_module_1 = require("./modules/client-status/client-status.module");
const upload_module_1 = require("./modules/upload/upload.module");
const ticket_type_module_1 = require("./modules/ticket-type/ticket-type.module");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
const ticket_side_module_1 = require("./modules/ticket-side/ticket-side.module");
const organization_module_1 = require("./modules/organization/organization.module");
const project_module_1 = require("./modules/project/project.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            client_module_1.ClientModule,
            user_module_1.UserModule,
            ticket_module_1.TicketModule,
            role_module_1.RoleModule,
            permission_module_1.PermissionModule,
            client_status_module_1.ClientStatusModule,
            upload_module_1.UploadModule,
            ticket_type_module_1.TicketTypeModule,
            dashboard_module_1.DashboardModule,
            ticket_type_module_1.TicketTypeModule,
            ticket_side_module_1.TicketSideModule,
            project_module_1.ProjectModule,
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.ACCESS_TOKEN_SECRET,
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [config_2.configuration],
                validationSchema: config_2.validationSchema,
            }),
            prisma_module_1.PrismaModule,
            organization_module_1.OrganizationModule,
        ],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.HttpExceptionFilter,
            },
            user_service_1.UserService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map