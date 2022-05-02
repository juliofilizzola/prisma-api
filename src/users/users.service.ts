import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repo: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {
    const result = this.repo.create(createUserDto);
    return result;
  }

  async findAll() {
    const result = this.repo.findAll();
    return result;
  }

  async findOne(id: number) {
    const result = this.repo.findOne(id);
    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const result = this.repo.update(id, updateUserDto);
    return result;
  }

  async remove(id: number) {
    const result = this.repo.remove(id);
    return result;
  }
}
