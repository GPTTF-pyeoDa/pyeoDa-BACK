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
  /**
   * OpenAI API를 호출하여 글쓰기 피드백 반환
   * @param content - 사용자가 작성한 글
   * @returns AI 피드백 메시지
   */
  async getWritingFeedback(content: string): Promise<{
    grammar: string[];
    spacing: string[];
    context: string[];
    suggestion: string;
  }> {
    const prompt = `
      다음 글에 대한 피드백을 JSON 형식으로 작성해주세요:
      - 문법
      - 띄어쓰기 및 맞춤법
      - 맥락 및 개선점

      JSON 형식은 다음과 같습니다:
      {
        "grammar": ["문법 관련 피드백 1", "문법 관련 피드백 2"],
        "spacing": ["띄어쓰기 관련 피드백 1", "띄어쓰기 관련 피드백 2"],
        "context": ["맥락 관련 피드백 1", "맥락 관련 피드백 2"],
        "suggestion": "수정된 예시 문장"
      }

      글:
      "${content}"

      반드시 위 JSON 형식으로만 응답해주세요.
    `;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              '당신은 글쓰기 코치 AI입니다. 글의 문법, 띄어쓰기, 맥락, 그리고 개선점을 피드백합니다.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      });

      // 응답 메시지 반환
      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error('OpenAI API 호출 중 오류 발생:', error);
      throw new Error('OpenAI API 호출 실패');
    }
  }
}
