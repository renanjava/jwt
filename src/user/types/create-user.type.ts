import { Role } from '@prisma/client';
import { UserEntity } from '../entity/user.entity';

export class CreateUserType
  implements Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>
{
  role: Role;
  name: string;
  email: string;
  password: string;
}
