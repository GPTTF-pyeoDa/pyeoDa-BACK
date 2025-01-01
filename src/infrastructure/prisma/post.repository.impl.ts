import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Post } from '../../domain/entities/post.entity';
import { PostRepository } from '../../domain/repositories/post.repository';
import { PostWithTagDto } from '../../application/dto/post-with-tag.dto';

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
        memID: post.memID,
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

  async findById(id: string): Promise<PostWithTagDto | null> {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        tag: { select: { name: true } },
      },
    });

    if (!post) {
      return null;
    }

    return new PostWithTagDto(
      post.id,
      post.title,
      post.content,
      post.isPublic,
      post.memID,
      post.tagId,
      post.tag?.name || null,
      post.createdAt,
      post.updatedAt,
    );
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.post.delete({
      where: { id },
    });
  }

  async updateById(id: string, updateData: Partial<Post>): Promise<Post> {
    const updatedPost = await this.prisma.post.update({
      where: { id },
      data: updateData,
    });

    return new Post(
      updatedPost.id,
      updatedPost.title,
      updatedPost.content,
      updatedPost.isPublic,
      updatedPost.memID,
      updatedPost.tagId,
      updatedPost.createdAt,
      updatedPost.updatedAt,
    );
  }
}
