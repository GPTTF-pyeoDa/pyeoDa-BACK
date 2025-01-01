import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TagModule } from './tag/tag.module';
import { PostModule } from './post/post.module';
@Module({
  imports: [
    PrismaModule,
    UsersModule,
    ScheduleModule.forRoot(),
    TagModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
