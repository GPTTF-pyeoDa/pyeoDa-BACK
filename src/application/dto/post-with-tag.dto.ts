export class PostWithTagDto {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly isPublic: boolean;
  readonly memID: string;
  readonly tagId: string | null;
  readonly tagName: string | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(
    id: string,
    title: string,
    content: string,
    isPublic: boolean,
    memID: string,
    tagId: string | null,
    tagName: string | null,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.isPublic = isPublic;
    this.memID = memID;
    this.tagId = tagId;
    this.tagName = tagName;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
