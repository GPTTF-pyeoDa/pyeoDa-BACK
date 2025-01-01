import { Module } from '@nestjs/common';
import { TagSchedulerService } from './tag-scheduler.service';
import { GenerateTagUseCase } from '../application/use-cases/generate-tag.usecase';
import { TagRepositoryImpl } from '../infrastructure/prisma/tag.repository.impl';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { OpenAiService } from '../infrastructure/prisma/openai.service';

@Module({
  providers: [
    TagSchedulerService,
    GenerateTagUseCase,
    { provide: 'TagRepository', useClass: TagRepositoryImpl },
    PrismaService,
    OpenAiService,
  ],
  exports: [GenerateTagUseCase],
})
export class TagModule {}
