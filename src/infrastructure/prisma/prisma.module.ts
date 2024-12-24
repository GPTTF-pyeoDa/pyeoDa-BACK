import { Global, Module } from '@nestjs/common';
import { PrismaService, PrismaUserRepository } from './prisma.service';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [USER_REPOSITORY, PrismaService],
})
export class PrismaModule {}
