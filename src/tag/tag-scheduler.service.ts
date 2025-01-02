import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { GenerateTagUseCase } from '../application/use-cases/generate-tag.usecase';
import { OpenAiService } from '../infrastructure/prisma/openai.service';
import { TagRepository } from 'src/domain/repositories/tag.repository';

@Injectable()
export class TagSchedulerService {
  constructor(
    private readonly generateTagUseCase: GenerateTagUseCase,
    private readonly openAiService: OpenAiService,
    @Inject('TagRepository') private readonly tagRepository: TagRepository,
  ) {}

  @Cron('0 1 * * *') // 매일 00:01 실행
  //   @Cron('*/5 * * * *') // 매 5분마다 실행
  async generateDailyTag() {
    // 1. DB에서 기존 글감 목록 조회
    const existingTags = await this.tagRepository.findAll(1000, 0); // 최대 1000개 조회
    const existingTagNames = existingTags[0].map((tag) => tag.name);

    // 2. OpenAI 프롬프트에 기존 글감 제외 조건 추가
    const prompt = `
      오늘의 글감을 추천해주세요. 다음 글감 목록을 제외하고 한 단어로 간결한 글감을 제공해주세요: 
      ${existingTagNames.join(', ')}
      특수문자는 제외하고 추천해주세요.
    `;
    const tagName = await this.openAiService.getTagSuggestion(prompt);
    if (tagName) {
      await this.generateTagUseCase.execute(tagName);
      console.log(`추천된 글감: ${tagName}`);
    } else {
      console.warn('추천된 글감이 없습니다.');
    }
  }

  // @Cron('*/1 * * * *') // 5분마다 실행
  // async generateTagEveryFiveMinutes() {
  //   // 1. DB에서 기존 글감 목록 조회
  //   const existingTags = await this.tagRepository.findAll(1000, 0); // 최대 1000개 조회
  //   const existingTagNames = existingTags[0].map((tag) => tag.name);

  //   // 2. OpenAI 프롬프트에 기존 글감 제외 조건 추가
  //   const prompt = `
  //     오늘의 글감을 추천해주세요. 다음 글감 목록을 제외하고 한 단어로 간결한 글감을 제공해주세요:
  //     ${existingTagNames.join(', ')}
  //     특수문자는 제외하고 추천해주세요.
  //   `;
  //   const tagName = await this.openAiService.getTagSuggestion(prompt);
  //   if (tagName) {
  //     await this.generateTagUseCase.execute(tagName);
  //     console.log(`추천된 글감(테스트): ${tagName}`);
  //   } else {
  //     console.warn('추천된 테스용 글감이 없습니다.');
  //   }
  // }
}
