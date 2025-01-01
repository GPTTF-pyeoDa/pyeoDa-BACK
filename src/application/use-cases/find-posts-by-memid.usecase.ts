import { Inject, Injectable } from '@nestjs/common';
import { PostRepository } from '../../domain/repositories/post.repository';
import { Post } from '../../domain/entities/post.entity';

@Injectable()
export class FindPostsByMemIdUseCase {
  constructor(
    @Inject('PostRepository') private readonly postRepository: PostRepository,
  ) {}

  async execute(memID: string): Promise<Partial<Post>[]> {
    return await this.postRepository.findByMemId(memID);
  }
}
