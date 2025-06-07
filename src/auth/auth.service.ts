import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async login(loginUserDto: LoginUserDto): Promise<string> {
    const userFounded = await this.userService.findByEmail(loginUserDto.email);

    const isValidPassword = await bcrypt.compare(
      loginUserDto.password,
      userFounded.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Senha inválida');
    }

    return 'testando uns negocio ai';
    //return this.jwtService.sign(userFounded);
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);

    return await this.userService.create({
      ...registerUserDto,
      password: hashedPassword,
    });
  }
}
