import { Module } from '@nestjs/common';
import { PostController } from '../presentation/controllers/post.controller';
import { FindPostsByMemIdUseCase } from '../application/use-cases/find-posts-by-memid.usecase';
import { FindPostByIdUseCase } from '../application/use-cases/find-post-by-id.usecase';
import { CreatePostUseCase } from '../application/use-cases/create-post.usecase';
import { PostRepositoryImpl } from '../infrastructure/prisma/post.repository.impl';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { DeletePostUseCase } from 'src/application/use-cases/delete-post.usecase';
import { UpdatePostUseCase } from '../application/use-cases/update-post.usecase';

@Module({
  controllers: [PostController],
  providers: [
    PrismaService,
    { provide: 'PostRepository', useClass: PostRepositoryImpl },
    CreatePostUseCase,
    FindPostsByMemIdUseCase,
    FindPostByIdUseCase,
    DeletePostUseCase,
    UpdatePostUseCase,
  ],
})
export class PostModule {}
