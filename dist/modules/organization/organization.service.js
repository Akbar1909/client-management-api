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
exports.OrganizationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrganizationService = class OrganizationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createOrganizationDto) {
        const newRecord = await this.prisma.organization.create({
            data: createOrganizationDto,
        });
        return {
            status: 'success',
            data: newRecord,
        };
    }
    async findAll({ page, size }) {
        const [records, total] = await this.prisma.$transaction([
            this.prisma.organization.findMany({
                skip: page * size,
                take: size,
            }),
            this.prisma.organization.count(),
        ]);
        return {
            status: 'success',
            data: {
                list: records,
                total,
            },
        };
    }
    async findOne(id) {
        const record = await this.prisma.organization.findFirst({
            where: { organizationId: id },
        });
        return {
            status: 'success',
            data: record,
        };
    }
    async update(id, updateOrganizationDto) {
        let record = await this.prisma.organization.findFirst({
            where: { organizationId: id },
        });
        if (!record) {
            throw new common_1.NotFoundException({
                message: `Organization with the ${id} not found`,
            });
        }
        record = await this.prisma.organization.update({
            where: { organizationId: id },
            data: updateOrganizationDto,
        });
        return {
            status: 'success',
            data: record,
        };
    }
    async remove(id) {
        await this.prisma.organization.delete({ where: { organizationId: id } });
        return {
            status: 'success',
            data: null,
        };
    }
};
exports.OrganizationService = OrganizationService;
exports.OrganizationService = OrganizationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrganizationService);
//# sourceMappingURL=organization.service.js.map