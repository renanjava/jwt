import { UserEntity } from 'src/user/entity/user.entity';

export class RegisterUserType
  implements Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>
{
  name: string;
  email: string;
  password: string;
}
