import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { configuration, validationSchema } from './config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClientModule } from './modules/client/client.module';
import { UserModule } from './modules/user/user.module';
import { UserService } from './modules/user/user.service';
import { TicketModule } from './modules/ticket/ticket.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './global-filters/http-exception.filter';
import { ClientStatusModule } from './modules/client-status/client-status.module';
import { UploadModule } from './modules/upload/upload.module';
import { TicketTypeModule } from './modules/ticket-type/ticket-type.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { TicketSideModule } from './modules/ticket-side/ticket-side.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { ProjectModule } from './modules/project/project.module';

@Module({
  imports: [
    AuthModule,
    ClientModule,
    UserModule,
    TicketModule,
    RoleModule,
    PermissionModule,
    ClientStatusModule,
    UploadModule,
    TicketTypeModule,
    DashboardModule,
    TicketTypeModule,
    TicketSideModule,
    ProjectModule,
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_TOKEN_SECRET,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    PrismaModule,
    OrganizationModule,
  ],
  // controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    UserService,
  ],
})
export class AppModule {}
