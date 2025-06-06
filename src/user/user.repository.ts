import { User } from '@prisma/client';
import { ICrudTemplate } from 'src/utils/crud-template.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
//implements ICrudTemplate<User, CreateUserDto, UpdateUserDto>
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }
  async findById(id: number): Promise<User | null> {
    return await this.prismaService.user.findUnique({ where: { id } });
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.prismaService.user.create({ data: createUserDto });
  }
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }
  async remove(id: number): Promise<User> {
    return await this.prismaService.user.delete({ where: { id } });
  }
}
