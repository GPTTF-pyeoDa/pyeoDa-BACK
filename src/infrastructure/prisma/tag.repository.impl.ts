import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { TagRepository } from '../../domain/repositories/tag.repository';
import { Tag } from '../../domain/entities/tag.entity';

@Injectable()
export class TagRepositoryImpl implements TagRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(tag: Tag): Promise<void> {
    await this.prisma.tag.create({
      data: {
        id: tag.id,
        name: tag.name,
        createdAt: tag.createdAt,
      },
    });
  }
}
