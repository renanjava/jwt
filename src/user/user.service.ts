import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { ICrudTemplate } from 'src/utils/crud-template.interface';
import { User } from '@prisma/client';

@Injectable()
export class UserService
  implements ICrudTemplate<User, CreateUserDto, UpdateUserDto>
{
  constructor(private readonly userRepository: UserRepository) {}
  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto);
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findById(id: number) {
    return await this.userRepository.findById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepository.remove(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findByEmail(email);
  }
}
