import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: CreateUserDto): Promise<UserEntity> {
    const result = await this.prisma.user.create({ data: user });
    return result;
  }

  async findAll(): Promise<UserEntity[]> {
    const result = await this.prisma.user.findMany();
    return result;
  }

  async findOne(id: number): Promise<UserEntity> {
    const result = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const result = await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });

    return result;
  }

  async remove(id: number): Promise<UserEntity> {
    const result = await this.prisma.user.delete({
      where: {
        id,
      },
    });
    return result;
  }
}
