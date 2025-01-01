import { Module } from '@nestjs/common';
import { GetTagsUseCase } from '../application/use-cases/get-tags.usecase';
import { TagSchedulerService } from './tag-scheduler.service';
import { GenerateTagUseCase } from '../application/use-cases/generate-tag.usecase';
import { TagRepositoryImpl } from '../infrastructure/prisma/tag.repository.impl';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { OpenAiService } from '../infrastructure/prisma/openai.service';
import { TagController } from '../presentation/controllers/tag.controller';

@Module({
  controllers: [TagController],
  providers: [
    TagSchedulerService,
    GenerateTagUseCase,
    { provide: 'TagRepository', useClass: TagRepositoryImpl },
    PrismaService,
    GetTagsUseCase,
    OpenAiService,
  ],
  exports: [GenerateTagUseCase],
})
export class TagModule {}
