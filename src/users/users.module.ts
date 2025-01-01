import { Module } from '@nestjs/common';
import { UsersController } from '../presentation/controllers/users.controller';
import { RegisterUserUseCase } from '../application/use-cases/register-user.usecase';
import { LoginUserUseCase } from '../application/use-cases/login-user.usecase';
import { PrismaModule } from '../infrastructure/prisma/prisma.module'; // PrismaModule 가져오기
import { USER_REPOSITORY } from '../domain/repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { VerifyAuthUseCase } from '../application/use-cases/verify-auth.usecase';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ], // PrismaModule을 imports에 추가
  controllers: [UsersController],
  providers: [
    RegisterUserUseCase,
    LoginUserUseCase,
    VerifyAuthUseCase,
    {
      provide: 'UserRepository', // RegisterUserUseCase에서 사용할 이름
      useExisting: USER_REPOSITORY, // PrismaModule에서 제공된 USER_REPOSITORY 사용
    },
  ],
})
export class UsersModule {}
