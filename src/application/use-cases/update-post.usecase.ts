import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from '../../domain/repositories/post.repository';
import { Post } from '../../domain/entities/post.entity';

@Injectable()
export class UpdatePostUseCase {
  constructor(
    @Inject('PostRepository') private readonly postRepository: PostRepository,
  ) {}

  async execute(id: string, updateData: Partial<Post>): Promise<Post> {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return await this.postRepository.updateById(id, updateData);
  }
}
