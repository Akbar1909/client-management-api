import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  UserCreateDto,
  UserFindAllQueryParamsDto,
  UserUpdateDto,
  UserUpdateRoleDto,
} from './dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UserEntity } from './user.entity';
import { extractObjectPart } from 'src/utils/extract-object-part';
import { Prisma } from '@prisma/client';
import OrderEnum from 'src/dto/order';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll({ search, openTicketCount }: UserFindAllQueryParamsDto) {
    const sqlQuery = `%${search}%`;

    const users = await this.prisma.$queryRaw`
      
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
    ${Prisma.sql`
    ORDER BY 
      ${
        !openTicketCount ? Prisma.sql`LOWER("User"."firstName")` : Prisma.empty
      } 
    
      ${
        openTicketCount
          ? openTicketCount === OrderEnum.ASC
            ? Prisma.sql`"openTicketCount" ASC`
            : Prisma.sql`"openTicketCount" DESC`
          : Prisma.empty
      }`}
      `;

    return {
      status: 'success',
      data: JSON.parse(
        JSON.stringify(users, (key: string, value) =>
          typeof value === 'bigint' ? value.toString() : value,
        ),
      ),
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

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with the id ${id} not found`);
    }

    return {
      data: {
        ...extractObjectPart<UserEntity>({
          type: 'exclude',
          obj: user,
          keys: ['hash', 'orgId'],
        }),
        clientId: user.orgId,
      },
      status: 'success',
    };
  }

  async findMe(user: UserEntity) {
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
      throw new NotFoundException(`User with the id ${user.id} not found`);
    }

    const client =
      typeof dbUser.orgId === 'number'
        ? await this.prisma.client.findFirst({
            where: { id: dbUser.orgId },
          })
        : {};

    const {
      role: { permissions, ...roleRest },
      ...rest
    } = dbUser;

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

  async create(dto: UserCreateDto) {
    const isAlreadyExists = await this.checkUserAlreadyExists(dto.username);

    if (isAlreadyExists) {
      throw new ConflictException({
        status: 'error',
        data: null,
        message: 'User already exists',
      });
    }

    // Create a hash
    const hash = await bcrypt.hash(dto.password, 10);

    // Save the user in db
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

  async update({ id, ...rest }: UserUpdateDto) {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: rest,
    });

    return {
      status: 'success',
      data: updatedUser,
    };
  }

  async deleteUser(id: number) {
    await this.prisma.user.delete({ where: { id } });
    return {
      status: 'success',
      data: null,
    };
  }

  async updateRole(id: number, dto: UserUpdateRoleDto) {
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

  async checkUserAlreadyExists(username: string) {
    return await this.prisma.user.findUnique({ where: { username } });
  }
}
