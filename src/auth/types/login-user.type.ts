import { UserEntity } from '../../user/entity/user.entity';

export class LoginUserType
  implements
    Omit<UserEntity, 'name' | 'id' | 'createdAt' | 'updatedAt' | 'role'>
{
  email: string;
  password: string;
}
