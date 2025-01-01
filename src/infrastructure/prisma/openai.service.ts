import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAiService {
  private readonly openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  /**
   * OpenAI API를 호출하여 응답을 반환
   * @param prompt - 사용자에게 보낼 메시지 내용
   * @returns AI 응답 메시지
   */
  async getTagSuggestion(prompt: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: '당신은 창의적인 글감을 추천하는 AI입니다.',
          },
          { role: 'user', content: prompt },
        ],
        max_tokens: 1000,
      });

      // 응답 메시지 반환
      return response.choices[0].message.content.trim();
    } catch (error) {
      console.error('OpenAI API 호출 중 오류 발생:', error);
      throw new Error('OpenAI API 호출 실패');
    }
  }
}
