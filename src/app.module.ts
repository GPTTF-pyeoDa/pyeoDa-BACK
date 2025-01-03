import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
