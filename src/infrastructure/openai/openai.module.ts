import { Module } from '@nestjs/common';
import { OpenAiService } from '../prisma/openai.service';

@Module({
  providers: [OpenAiService],
  exports: [OpenAiService],
})
export class OpenAiModule {}
