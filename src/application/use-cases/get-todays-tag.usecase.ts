import { Inject, Injectable } from '@nestjs/common';
import { TagRepository } from '../../domain/repositories/tag.repository';
import { Tag } from '../../domain/entities/tag.entity';

@Injectable()
export class GetTodaysTagUseCase {
  constructor(
    @Inject('TagRepository') private readonly tagRepository: TagRepository,
  ) {}

  async execute(): Promise<Tag | null> {
    return await this.tagRepository.findMostRecent();
  }
}
