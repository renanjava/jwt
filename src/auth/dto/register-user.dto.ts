import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { RegisterUserType } from '../types/register-user.type';

export class RegisterUserDto implements RegisterUserType {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
