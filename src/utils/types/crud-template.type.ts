import { CreateUserDto } from '../../user/dto/create-user.dto';
import { ICrudTemplate } from '../crud-template.interface';
import { UpdateUserDto } from '../../user/dto/update-user.dto';
import { User } from '@prisma/client';

export abstract class CrudTemplate
  implements ICrudTemplate<User, CreateUserDto, UpdateUserDto>
{
  abstract create(r: CreateUserDto): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findById(id: number): Promise<User>;
  abstract update(id: number, u: UpdateUserDto): Promise<User>;
  abstract remove(id: number): Promise<User>;
}
