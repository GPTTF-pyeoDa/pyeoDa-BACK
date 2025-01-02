import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  Delete,
  Put,
  Patch,
} from '@nestjs/common';
import { Post as PostEntity } from '../../domain/entities/post.entity';
import { CreatePostUseCase } from '../../application/use-cases/create-post.usecase';
import { FindPostsByMemIdUseCase } from '../../application/use-cases/find-posts-by-memid.usecase';
import { FindPostByIdUseCase } from 'src/application/use-cases/find-post-by-id.usecase';
import { DeletePostUseCase } from 'src/application/use-cases/delete-post.usecase';
import { UpdatePostUseCase } from 'src/application/use-cases/update-post.usecase';
import { GenerateWritingFeedbackUseCase } from 'src/application/use-cases/generate-writing-feedback.usecase';
import { FindPublicPostsByTagIdUseCase } from 'src/application/use-cases/find-public-posts-by-tag-id.usecase';
import { TogglePostPublicUseCase } from 'src/application/use-cases/toggle-is-public.usecase';

@Controller('posts')
export class PostController {
  constructor(
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly findPostsByMemIdUseCase: FindPostsByMemIdUseCase,
    private readonly findPostByIdUseCase: FindPostByIdUseCase,
    private readonly deletePostUseCase: DeletePostUseCase,
    private readonly updatePostUseCase: UpdatePostUseCase,
    private readonly generateFeedbackUseCase: GenerateWritingFeedbackUseCase,
    private readonly findPublicPostsByTagIdUseCase: FindPublicPostsByTagIdUseCase,
    private readonly togglePostPublicUseCase: TogglePostPublicUseCase,
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

  @Put(':id') // PUT /posts/:id
  async updatePostById(
    @Param('id') id: string,
    @Body()
    updateData: { title?: string; content?: string; isPublic?: boolean },
  ) {
    return await this.updatePostUseCase.execute(id, updateData);
  }

  @Post(':id/feedback') // POST /posts/:id/feedback
  async generateFeedback(@Body('content') content: string) {
    const feedback = await this.generateFeedbackUseCase.execute(content);
    return { feedback };
  }

  @Get('tag/:tagId') // GET /posts/:tagId
  async getPublicPostsByTagId(
    @Param('tagId') tagId: string,
  ): Promise<PostEntity[]> {
    return await this.findPublicPostsByTagIdUseCase.execute(tagId);
  }

  @Patch(':id/toggle-public') // PATCH /posts/:id/toggle-public
  async togglePostPublic(
    @Param('id') postId: string,
  ): Promise<{ id: string; isPublic: boolean }> {
    const updatedPost = await this.togglePostPublicUseCase.execute(postId);
    return { id: updatedPost.id, isPublic: updatedPost.isPublic };
  }
}
