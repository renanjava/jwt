import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
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

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{11}$/, { message: 'CPF inválido' })
  cpf: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEnum(Role, { each: true })
  @IsNotEmpty()
  role: Role;
}
