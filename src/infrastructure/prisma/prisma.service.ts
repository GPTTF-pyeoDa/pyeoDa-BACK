import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient, User as PrismaUser } from '@prisma/client';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(memID: string): Promise<User | null> {
    const user: PrismaUser | null = await this.prisma.user.findUnique({
      where: { memID },
    });
    if (!user) return null;
    return new User(user.memID, user.email, user.password, user.name);
  }

  async create(user: User): Promise<User> {
    const createdUser: PrismaUser = await this.prisma.user.create({
      data: {
        memID: user.memID,
        password: user.password,
        name: user.name,
        email: user.email,
      },
    });
    return new User(
      createdUser.memID,
      createdUser.password,
      createdUser.name,
      createdUser.email,
    );
  }
}
