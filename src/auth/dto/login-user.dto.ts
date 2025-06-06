import { LoginUserType } from '../types/login-user.type';

export class LoginUserDto implements LoginUserType {
  email: string;
  password: string;
}
