import { Inject, Injectable } from '@nestjs/common';
import { PostRepository } from '../../domain/repositories/post.repository';
import { Post } from '../../domain/entities/post.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CreatePostUseCase {
  constructor(
    @Inject('PostRepository') private readonly postRepository: PostRepository,
  ) {}

  async execute(data: {
    title: string;
    content: string;
    isPublic: boolean;
    memID: string;
    tagId?: string;
  }): Promise<Post> {
    console.log(data);
    const post = new Post(
      uuid(),
      data.title,
      data.content,
      data.isPublic,
      data.memID, // User.memID
      data.tagId || null,
      new Date(),
      new Date(),
    );

    return this.postRepository.create(post);
  }
}
