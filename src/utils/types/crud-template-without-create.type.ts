import { CreateUserDto } from '../../user/dto/create-user.dto';
import { ICrudTemplate } from '../crud-template.interface';
import { UpdateUserDto } from '../../user/dto/update-user.dto';
import { User } from '@prisma/client';

export abstract class CrudTemplateWithoutCreate
  implements Omit<ICrudTemplate<User, CreateUserDto, UpdateUserDto>, 'create'>
{
  abstract findAll(): Promise<User[]>;
  abstract findById(id: number): Promise<User>;
  abstract update(id: number, u: UpdateUserDto): Promise<User>;
  abstract remove(id: number): Promise<User>;
}
