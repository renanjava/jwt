import { UserEntity } from '../../user/entity/user.entity';
import { Role } from '@prisma/client';

export class RegisterUserType
  implements Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>
{
  role: Role;
  name: string;
  email: string;
  password: string;
}
