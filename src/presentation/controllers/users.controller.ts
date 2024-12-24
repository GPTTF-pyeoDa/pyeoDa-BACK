import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.usecase';
import { CreateUserDto } from '../../application/dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

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
}
