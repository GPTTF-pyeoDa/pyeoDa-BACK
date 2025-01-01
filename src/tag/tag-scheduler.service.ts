import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { GenerateTagUseCase } from '../application/use-cases/generate-tag.usecase';
import { OpenAiService } from '../infrastructure/prisma/openai.service';

@Injectable()
export class TagSchedulerService {
  constructor(
    private readonly generateTagUseCase: GenerateTagUseCase,
    private readonly openAiService: OpenAiService,
  ) {}

  @Cron('0 1 * * *') // 매일 00:01 실행
  //   @Cron('*/5 * * * *') // 매 5분마다 실행
  async generateDailyTag() {
    const prompt =
      '오늘의 글감을 추천해주세요. 한 단어로 감성적이면서 간결한 글감을 제공해주세요.';
    const tagName = await this.openAiService.getTagSuggestion(prompt);
    await this.generateTagUseCase.execute(tagName);
    console.log(`추천된 글감: ${tagName}`);
  }

  @Cron('*/5 * * * *') // 5분마다 실행
  async generateTagEveryFiveMinutes() {
    const prompt =
      '테스트를 위해 글감을 추천해주세요. 한 단어로 감성적이면서 간결한 글감을 제공해주세요.';
    const suggestion = await this.openAiService.getTagSuggestion(prompt);
    await this.generateTagUseCase.execute(suggestion);
    console.log(`추천된 글감 (테스트): ${suggestion}`);
  }
}
