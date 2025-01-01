import { Controller, Get, Query } from '@nestjs/common';
import { GetTagsUseCase } from '../../application/use-cases/get-tags.usecase';

@Controller('tags')
export class TagController {
  constructor(private readonly getTagsUseCase: GetTagsUseCase) {}

  @Get()
  async getTags(
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
    @Query('search') search?: string,
  ) {
    const { data, total } = await this.getTagsUseCase.execute(
      limit,
      offset,
      search,
    );
    return {
      data: data.map((tag) => ({
        id: tag.id,
        name: tag.name,
        createdAt: tag.createdAt,
      })),
      pagination: { total, limit, offset },
    };
  }
}
