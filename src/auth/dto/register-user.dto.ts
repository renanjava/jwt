/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RegisterUserType } from '../types/register-user.type';
import { Role } from '@prisma/client';

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

  @IsEnum(Role, { each: true })
  @IsNotEmpty()
  role: Role;
}
