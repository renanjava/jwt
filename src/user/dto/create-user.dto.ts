import { IsEnum, IsNotEmpty, IsString, Matches } from 'class-validator';
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
