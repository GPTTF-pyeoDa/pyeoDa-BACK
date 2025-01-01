import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreatePostUseCase } from '../../application/use-cases/create-post.usecase';
import { FindPostsByMemIdUseCase } from '../../application/use-cases/find-posts-by-memid.usecase';

@Controller('posts')
export class PostController {
  constructor(
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly findPostsByMemIdUseCase: FindPostsByMemIdUseCase,
  ) {}

  @Post()
  async createPost(@Body() data: any) {
    return await this.createPostUseCase.execute(data);
  }

  @Get(':memID/posts') // GET /users/:memID/posts
  async getPostsByMemId(@Param('memID') memID: string) {
    return await this.findPostsByMemIdUseCase.execute(memID);
  }
}
