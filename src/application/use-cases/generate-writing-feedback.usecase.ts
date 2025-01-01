import { Injectable } from '@nestjs/common';
import { OpenAiService } from '../../infrastructure/prisma/openai.service';

@Injectable()
export class GenerateWritingFeedbackUseCase {
  constructor(private readonly openAiService: OpenAiService) {}

  /**
   * 사용자가 작성한 글에 대한 피드백 생성
   * @param content - 사용자가 작성한 글
   * @returns AI가 생성한 피드백
   */
  async execute(content: string): Promise<{
    grammar: string[];
    spacing: string[];
    context: string[];
    suggestion: string;
  }> {
    // OpenAI 서비스를 통해 글쓰기 피드백 생성
    return await this.openAiService.getWritingFeedback(content);
  }
}
