import { Inject, Injectable } from '@nestjs/common';
import { TagRepository } from '../../domain/repositories/tag.repository';
import { Tag } from '../../domain/entities/tag.entity';

@Injectable()
export class GetTagsUseCase {
  constructor(
    @Inject('TagRepository') private readonly tagRepository: TagRepository,
  ) {}

  async execute(
    limit = 10,
    offset = 0,
    search?: string,
  ): Promise<{ data: Tag[]; total: number }> {
    const [tags, total] = await this.tagRepository.findAll(
      limit,
      offset,
      search,
    );
    return { data: tags, total };
  }
}
