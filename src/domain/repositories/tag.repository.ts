import { Tag } from '../entities/tag.entity';

export interface TagRepository {
  save(tag: Tag): Promise<void>;
}
