import { Post } from '../entities/post.entity';

export interface PostRepository {
  create(post: Post): Promise<Post>;
  findByMemId(memID: string): Promise<Partial<Post>[]>;
}
