import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { IService } from 'src/utils/service.interface';
import { User } from '@prisma/client';

@Injectable()
export class UserService
  implements IService<User, CreateUserDto, UpdateUserDto>
{
  constructor(private readonly userRepository: UserRepository) {}
  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto);
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOne(id: number) {
    const userFounded = await this.userRepository.findById(id);
    if (!userFounded) throw new NotFoundException('Usuário não encontrado');
    return userFounded;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.findOne(id);
    const updatedUser = await this.userRepository.update(id, updateUserDto);
    if (!updatedUser) throw new ConflictException('Email já existente');
    return updatedUser;
  }

  async remove(id: number) {
    await this.findOne(id);
    const removedUser = await this.userRepository.remove(id);
    if (!removedUser)
      throw new ConflictException(
        'Usuário possui dependência com outro registro',
      );
    return removedUser;
  }
}
