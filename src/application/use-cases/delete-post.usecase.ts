import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from '../../domain/repositories/post.repository';

@Injectable()
export class DeletePostUseCase {
  constructor(
    @Inject('PostRepository') private readonly postRepository: PostRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    await this.postRepository.deleteById(id);
  }
}
