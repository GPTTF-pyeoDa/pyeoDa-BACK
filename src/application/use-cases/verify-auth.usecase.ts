import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../domain/entities/user.entity';
import {
  UserRepository,
  USER_REPOSITORY,
} from '../../domain/repositories/user.repository';

@Injectable()
export class VerifyAuthUseCase {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async execute(token: string): Promise<User> {
    try {
      // JWT 토큰 검증
      const payload = await this.jwtService.verifyAsync(token);

      // 토큰에서 추출한 memID로 사용자 조회
      const user = await this.userRepository.findByMemID(payload.memID);

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      console.error(error);
      throw new Error('Invalid token');
    }
  }
}
