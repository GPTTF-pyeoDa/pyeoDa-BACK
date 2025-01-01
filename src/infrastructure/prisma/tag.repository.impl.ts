import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { TagRepository } from '../../domain/repositories/tag.repository';
import { Tag } from '../../domain/entities/tag.entity';

@Injectable()
export class TagRepositoryImpl implements TagRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(tag: Tag): Promise<void> {
    try {
      await this.prisma.tag.create({
        data: {
          id: tag.id,
          name: tag.name,
          createdAt: tag.createdAt,
        },
      });
    } catch (error) {
      // 적절한 에러 로깅을 추가
      console.error('Tag saving failed:', error);
      throw new Error('Unable to save the tag');
    }
  }

  async findAll(
    limit: number,
    offset: number,
    search?: string,
  ): Promise<[Tag[], number]> {
    const where = search ? { name: { contains: search } } : {};
    const tags = await this.prisma.tag.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    const total = await this.prisma.tag.count({ where });

    return [tags.map((tag) => new Tag(tag.id, tag.name, tag.createdAt)), total];
  }

  async findMostRecent(): Promise<Tag | null> {
    const tag = await this.prisma.tag.findFirst({
      orderBy: { createdAt: 'desc' }, // 가장 최근 생성된 글감 조회
    });

    if (!tag) return null;
    return new Tag(tag.id, tag.name, tag.createdAt);
  }
}
