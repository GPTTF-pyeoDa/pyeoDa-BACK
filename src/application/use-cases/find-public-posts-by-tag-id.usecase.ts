import { Inject, Injectable } from '@nestjs/common';
import { PostRepository } from '../../domain/repositories/post.repository';
import { Post } from '../../domain/entities/post.entity';

@Injectable()
export class FindPublicPostsByTagIdUseCase {
  constructor(
    @Inject('PostRepository') private readonly postRepository: PostRepository,
  ) {}

  async execute(tagId: string): Promise<Post[]> {
    return await this.postRepository.findAllPublicPostsByTagId(tagId);
  }
}
