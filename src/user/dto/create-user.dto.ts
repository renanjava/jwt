import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserType } from '../types/create-user.type';

export class CreateUserDto implements CreateUserType {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
