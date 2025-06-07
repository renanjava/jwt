import { IsNotEmpty, IsString } from 'class-validator';
import { LoginUserType } from '../types/login-user.type';

export class LoginUserDto implements LoginUserType {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
