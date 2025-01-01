import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Post } from '../../domain/entities/post.entity';
import { PostRepository } from '../../domain/repositories/post.repository';

@Injectable()
export class PostRepositoryImpl implements PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(post: Post): Promise<Post> {
    const createdPost = await this.prisma.post.create({
      data: {
        id: post.id,
        title: post.title,
        content: post.content,
        isPublic: post.isPublic,
        memID: post.memID, // User.memID 참조
        tagId: post.tagId,
      },
    });

    return new Post(
      createdPost.id,
      createdPost.title,
      createdPost.content,
      createdPost.isPublic,
      createdPost.memID,
      createdPost.tagId,
      createdPost.createdAt,
      createdPost.updatedAt,
    );
  }

  async findByMemId(memID: string): Promise<Partial<Post>[]> {
    const posts = await this.prisma.post.findMany({
      where: { memID },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        isPublic: true,
        tagId: true,
        createdAt: true,
      },
    });

    return posts;
  }
}