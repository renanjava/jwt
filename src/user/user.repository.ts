import { User } from '@prisma/client';
import { IRepository } from 'src/utils/repository.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

export class UserRepository
  implements IRepository<User, CreateUserDto, UpdateUserDto>
{
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
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    return await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }
  async remove(id: number): Promise<User | null> {
    return await this.prismaService.user.delete({ where: { id } });
  }
}
