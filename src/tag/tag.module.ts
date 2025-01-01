import { Module } from '@nestjs/common';
import { TagRepositoryImpl } from '../infrastructure/prisma/tag.repository.impl';
import { GetTagsUseCase } from '../application/use-cases/get-tags.usecase';
import { GenerateTagUseCase } from '../application/use-cases/generate-tag.usecase';
import { GetTodaysTagUseCase } from '../application/use-cases/get-todays-tag.usecase';
import { TagSchedulerService } from './tag-scheduler.service';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { OpenAiService } from '../infrastructure/prisma/openai.service';
import { TagController } from '../presentation/controllers/tag.controller';

@Module({
  controllers: [TagController],
  providers: [
    { provide: 'TagRepository', useClass: TagRepositoryImpl },
    GetTagsUseCase,
    GenerateTagUseCase,
    GetTodaysTagUseCase,
    TagSchedulerService,
    PrismaService,
    OpenAiService,
  ],
  exports: [GenerateTagUseCase],
})
export class TagModule {}
