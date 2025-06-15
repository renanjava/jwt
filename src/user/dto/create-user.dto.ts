import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CreateUserType } from '../types/create-user.type';
import { Role } from '@prisma/client';

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

  @IsEnum(Role, { each: true })
  @IsNotEmpty()
  role: Role;
}
