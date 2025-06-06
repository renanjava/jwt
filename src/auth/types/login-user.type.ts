import { UserEntity } from 'src/user/entity/user.entity';

export class LoginUserType
  implements Omit<UserEntity, 'name' | 'id' | 'createdAt' | 'updatedAt'>
{
  email: string;
  password: string;
}
