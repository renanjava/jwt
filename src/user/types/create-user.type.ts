import { UserEntity } from '../entity/user.entity';

export class CreateUserType
  implements Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>
{
  name: string;
  email: string;
  password: string;
}
