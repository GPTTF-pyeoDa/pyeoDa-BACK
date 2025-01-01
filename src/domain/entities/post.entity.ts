export class Post {
  constructor(
    public readonly id: string,
    public title: string,
    public content: string,
    public isPublic: boolean,
    public memID: string,
    public tagId: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
