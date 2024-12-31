import { Inject, Injectable } from '@nestjs/common';
import {
  UserRepository,
  USER_REPOSITORY,
} from '../../domain/repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../../domain/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) // USER_REPOSITORY를 사용하여 주입
    private readonly userRepository: UserRepository,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const { memID, password, name, email } = createUserDto;

    const existingMemID = await this.userRepository.findByMemID(memID);
    if (existingMemID) {
      throw new Error('이미 존재하는 ID입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(memID, hashedPassword, name, email);

    return this.userRepository.create(user);
  }
}
