import { Inject, Injectable } from '@nestjs/common';
import { TagRepository } from '../../domain/repositories/tag.repository';
import { Tag } from '../../domain/entities/tag.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class GenerateTagUseCase {
  constructor(
    @Inject('TagRepository') private readonly tagRepository: TagRepository,
  ) {}

  async execute(tagName: string): Promise<void> {
    const tag = new Tag(uuid(), tagName, new Date());
    await this.tagRepository.save(tag);
  }
}
