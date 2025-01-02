import { Module } from '@nestjs/common';
import { PostController } from '../presentation/controllers/post.controller';
import { FindPostsByMemIdUseCase } from '../application/use-cases/find-posts-by-memid.usecase';
import { FindPostByIdUseCase } from '../application/use-cases/find-post-by-id.usecase';
import { CreatePostUseCase } from '../application/use-cases/create-post.usecase';
import { PostRepositoryImpl } from '../infrastructure/prisma/post.repository.impl';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { DeletePostUseCase } from 'src/application/use-cases/delete-post.usecase';
import { UpdatePostUseCase } from '../application/use-cases/update-post.usecase';
import { GenerateWritingFeedbackUseCase } from 'src/application/use-cases/generate-writing-feedback.usecase';
import { OpenAiModule } from '../infrastructure/openai/openai.module';
import { FindPublicPostsByTagIdUseCase } from 'src/application/use-cases/find-public-posts-by-tag-id.usecase';
import { TogglePostPublicUseCase } from 'src/application/use-cases/toggle-is-public.usecase';

@Module({
  imports: [OpenAiModule],
  controllers: [PostController],
  providers: [
    PrismaService,
    { provide: 'PostRepository', useClass: PostRepositoryImpl },
    CreatePostUseCase,
    FindPostsByMemIdUseCase,
    FindPostByIdUseCase,
    DeletePostUseCase,
    UpdatePostUseCase,
    GenerateWritingFeedbackUseCase,
    FindPublicPostsByTagIdUseCase,
    TogglePostPublicUseCase,
  ],
})
export class PostModule {}
