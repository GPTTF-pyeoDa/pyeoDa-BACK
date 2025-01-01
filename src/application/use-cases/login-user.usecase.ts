import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  UserRepository,
  USER_REPOSITORY,
} from '../../domain/repositories/user.repository';
import { LoginUserDto } from '../dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const { memID, password } = loginUserDto;

    // 사용자 조회
    const user = await this.userRepository.findByMemID(memID);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials-memID');
    }

    // 비밀번호 검증
    const isValid = await this.userRepository.validatePassword(
      password,
      user.password,
    );

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials-password');
    }

    // JWT 토큰 발급
    const payload = { sub: user.memID, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
