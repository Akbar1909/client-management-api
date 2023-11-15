// import { Test, TestingModule } from '@nestjs/testing';
// // import { mockDeep } from 'jest-mock-extended';
// import { PrismaService } from '../prisma/prisma.service';
// import { UserController } from './user.controller';
// import { UserEntity } from './user.entity';
// import { UserService } from './user.service';
// import { PrismaClient } from '@prisma/client';

// describe('UserController', () => {
//   let controller: UserController;
//   let service: UserService;
//   let prisma: PrismaService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [UserService, PrismaService],
//       controllers: [UserController],
//     })
//       .overrideProvider(PrismaService)
//       .useValue(mockDeep<PrismaClient>())
//       .compile();

//     controller = module.get(UserController);
//     service = module.get(UserService);
//     prisma = module.get(PrismaService);
//   });

//   it('findAll should return an array of users', async () => {
//     const result: UserEntity[] = [];

//     prisma.user.findMany = jest.fn().mockReturnValue(result);

//     jest
//       .spyOn(service, 'findAll')
//       .mockImplementation(
//         async () => await { status: 'success', data: result },
//       );
//     expect(await controller.findAll({ search: '' })).toBe(result);
//   });
// });
