"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const prisma_service_1 = require("../prisma/prisma.service");
const extract_object_part_1 = require("../../utils/extract-object-part");
const client_1 = require("@prisma/client");
const order_1 = __importDefault(require("../../dto/order"));
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll({ search, openTicketCount }) {
        const sqlQuery = `%${search}%`;
        const users = await this.prisma.$queryRaw `
      
    SELECT
      "User"."id",
      "firstName",
      "lastName",
      "username",
      "phone",
	    "Role"."name" AS "role",
      COUNT(DISTINCT "DeveloperTickets"."id") AS "totalTicketCount",
      COUNT(DISTINCT CASE WHEN "DeveloperTickets"."status" = 'task_done' THEN "DeveloperTickets"."id" END) AS "doneTicketCount",
      COUNT(DISTINCT CASE WHEN "DeveloperTickets"."status" <> 'task_done' THEN "DeveloperTickets"."id" END) AS "openTicketCount"
    FROM 
      "User"
    LEFT JOIN 
      "Ticket" AS "OperatorTickets" 
    ON 
      "User"."id" = "OperatorTickets"."operatorId"
    LEFT JOIN 
      "Ticket" AS "DeveloperTickets" 
    ON 
      "User"."id" = "DeveloperTickets"."developerId"
    LEFT JOIN 
      "Role" 
    ON 
      "User"."roleId" = "Role"."id"
    WHERE 
      "User"."firstName" ILIKE ${sqlQuery} OR "User"."lastName" ILIKE ${sqlQuery} OR "User"."username" ILIKE ${sqlQuery}
    GROUP BY 
      "User"."id", 
      "User"."firstName",
      "User"."lastName", 
      "User"."username",
      "User"."phone", 
      "Role"."name"
    ${client_1.Prisma.sql `
    ORDER BY 
      ${!openTicketCount ? client_1.Prisma.sql `LOWER("User"."firstName")` : client_1.Prisma.empty} 
    
      ${openTicketCount
            ? openTicketCount === order_1.default.ASC
                ? client_1.Prisma.sql `"openTicketCount" ASC`
                : client_1.Prisma.sql `"openTicketCount" DESC`
            : client_1.Prisma.empty}`}
      `;
        return {
            status: 'success',
            data: JSON.parse(JSON.stringify(users, (key, value) => typeof value === 'bigint' ? value.toString() : value)),
        };
    }
    async findOptions() {
        const users = await this.prisma.user.findMany({
            where: {
                orgId: null,
            },
            select: { id: true, firstName: true, lastName: true },
        });
        return {
            status: 'success',
            data: users,
        };
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                role: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with the id ${id} not found`);
        }
        return {
            data: {
                ...(0, extract_object_part_1.extractObjectPart)({
                    type: 'exclude',
                    obj: user,
                    keys: ['hash', 'orgId'],
                }),
                clientId: user.orgId,
            },
            status: 'success',
        };
    }
    async findMe(user) {
        const dbUser = await this.prisma.user.findUnique({
            where: { id: user.id },
            include: {
                role: {
                    include: {
                        permissions: true,
                    },
                },
            },
        });
        if (!dbUser) {
            throw new common_1.NotFoundException(`User with the id ${user.id} not found`);
        }
        const client = typeof dbUser.orgId === 'number'
            ? await this.prisma.client.findFirst({
                where: { id: dbUser.orgId },
            })
            : {};
        const { role: { permissions, ...roleRest }, ...rest } = dbUser;
        return {
            status: 'success',
            data: {
                ...rest,
                role: roleRest,
                permissions,
                client,
            },
        };
    }
    async create(dto) {
        const isAlreadyExists = await this.checkUserAlreadyExists(dto.username);
        if (isAlreadyExists) {
            throw new common_1.ConflictException({
                status: 'error',
                data: null,
                message: 'User already exists',
            });
        }
        const hash = await bcrypt.hash(dto.password, 10);
        const newUser = await this.prisma.user.create({
            data: {
                username: dto.username,
                hash,
                firstName: dto.firstName,
                lastName: dto.lastName,
                roleId: dto.roleId,
                phone: dto.phone,
                orgId: dto.clientId,
            },
            select: {
                username: true,
                firstName: true,
                lastName: true,
                role: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        return {
            status: 'success',
            data: newUser,
        };
    }
    async update({ id, ...rest }) {
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: rest,
        });
        return {
            status: 'success',
            data: updatedUser,
        };
    }
    async deleteUser(id) {
        await this.prisma.user.delete({ where: { id } });
        return {
            status: 'success',
            data: null,
        };
    }
    async updateRole(id, dto) {
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: {
                roleId: dto.roleId,
            },
        });
        return {
            status: 'success',
            data: updatedUser,
        };
    }
    async checkUserAlreadyExists(username) {
        return await this.prisma.user.findUnique({ where: { username } });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map