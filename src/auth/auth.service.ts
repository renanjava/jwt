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
  async login(loginUserDto: LoginUserDto): Promise<Record<string, any>> {
    const userFounded = await this.userService.findByEmail(loginUserDto.email);

    const isValidPassword = await bcrypt.compare(
      loginUserDto.password,
      userFounded.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Senha inválida');
    }
    const payload = {
      sub: userFounded.id,
      username: userFounded.name,
      role: userFounded.role,
    };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);

    return await this.userService.create({
      ...registerUserDto,
      password: hashedPassword,
    });
  }
}
