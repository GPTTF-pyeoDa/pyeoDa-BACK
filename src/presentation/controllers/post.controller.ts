import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { CreatePostUseCase } from '../../application/use-cases/create-post.usecase';
import { FindPostsByMemIdUseCase } from '../../application/use-cases/find-posts-by-memid.usecase';
import { FindPostByIdUseCase } from 'src/application/use-cases/find-post-by-id.usecase';
import { DeletePostUseCase } from 'src/application/use-cases/delete-post.usecase';

@Controller('posts')
export class PostController {
  constructor(
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly findPostsByMemIdUseCase: FindPostsByMemIdUseCase,
    private readonly findPostByIdUseCase: FindPostByIdUseCase,
    private readonly deletePostUseCase: DeletePostUseCase,
  ) {}

  @Post()
  async createPost(@Body() data: any) {
    return await this.createPostUseCase.execute(data);
  }

  @Get('post/:id') // GET /post/:id
  async getPostById(@Param('id') id: string) {
    const post = await this.findPostByIdUseCase.execute(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  @Get(':memID') // GET /:memID
  async getPostsByMemId(@Param('memID') memID: string) {
    return await this.findPostsByMemIdUseCase.execute(memID);
  }

  @Delete(':id') // DELETE /posts/:id
  async deletePostById(@Param('id') id: string) {
    try {
      await this.deletePostUseCase.execute(id);
      return { message: 'Post deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Post not found');
      }
      throw error;
    }
  }
}
