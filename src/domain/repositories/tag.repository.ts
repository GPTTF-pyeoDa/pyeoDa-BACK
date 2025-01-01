import { Tag } from '../entities/tag.entity';

export interface TagRepository {
  save(tag: Tag): Promise<void>;
  findAll(
    limit: number,
    offset: number,
    search?: string,
  ): Promise<[Tag[], number]>;
  findMostRecent(): Promise<Tag | null>; // 가장 최근 글감 조회
}
