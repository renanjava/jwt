import { UserEntity } from 'src/user/entity/user.entity';

export class UserPayloadType implements Pick<UserEntity, 'id'> {
  id: string;
}
