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
}
