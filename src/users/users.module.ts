import { Module } from '@nestjs/common';
import { UsersController } from '../presentation/controllers/users.controller';
import { RegisterUserUseCase } from '../application/use-cases/register-user.usecase';
import { PrismaModule } from '../infrastructure/prisma/prisma.module'; // PrismaModule 가져오기
import { USER_REPOSITORY } from '../domain/repositories/user.repository';

@Module({
  imports: [PrismaModule], // PrismaModule을 imports에 추가
  controllers: [UsersController],
  providers: [
    RegisterUserUseCase,
    {
      provide: 'UserRepository', // RegisterUserUseCase에서 사용할 이름
      useExisting: USER_REPOSITORY, // PrismaModule에서 제공된 USER_REPOSITORY 사용
    },
  ],
})
export class UsersModule {}
