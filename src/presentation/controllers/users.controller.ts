import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.usecase';
import { LoginUserUseCase } from '../../application/use-cases/login-user.usecase';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { LoginUserDto } from '../../application/dto/login-user.dto';
import { VerifyAuthUseCase } from '../../application/use-cases/verify-auth.usecase';

@Controller('users')
export class UsersController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly verifyAuthUseCase: VerifyAuthUseCase,
  ) {}

  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ message: string }> {
    try {
      await this.registerUserUseCase.execute(createUserDto);
      return { message: '회원가입이 완료되었습니다.' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ token: string; message: string }> {
    try {
      const data = await this.loginUserUseCase.execute(loginUserDto);
      return {
        token: data.accessToken,
        message: '로그인이 완료되었습니다.',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('verify')
  async verifyAuth(@Headers('authorization') auth: string) {
    try {
      if (!auth || !auth.startsWith('Bearer ')) {
        throw new UnauthorizedException('No token provided');
      }

      const token = auth.split(' ')[1];
      const user = await this.verifyAuthUseCase.execute(token);

      return {
        isAuthenticated: true,
        user: {
          memID: user.memID,
          email: user.email,
          name: user.name,
          // 필요한 사용자 정보만 반환
        },
      };
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
