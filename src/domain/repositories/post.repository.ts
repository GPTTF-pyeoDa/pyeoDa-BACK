import { Post } from '../entities/post.entity';

export interface PostRepository {
  create(post: Post): Promise<Post>;
  findByMemId(memID: string): Promise<Partial<Post>[]>;
  findById(id: string): Promise<Post | null>;
  deleteById(id: string): Promise<void>;
  updateById(id: string, updateData: Partial<Post>): Promise<Post>;
  findAllPublicPostsByTagId(tagId: string): Promise<Post[]>;
}
