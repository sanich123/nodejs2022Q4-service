import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async signIn(login: string, password: string) {
    const user = await this.userService.findOneByLogin(login);
    if (!user) {
      throw new BadRequestException('This login does not exist in database');
    } else {
      const { id, login, password: dbPassword } = user;
      const match = await compare(password, dbPassword);
      if (!match) {
        throw new UnauthorizedException('Password in the database does not equals received passwrod');
      }
      const payload = { userId: id, login };
      return {
        accessToken: await this.jwtService.signAsync(payload),
      };
    }
  }

  async signUp(login: string, password: string) {
    const user = await this.userService.findOneByLogin(login);
    if (user) {
      throw new BadRequestException('This login is already in a database');
    } else {
      const hashedPassword = await hash(password, +process.env.CRYPT_SALT);
      return await this.userService.createUser({ login, password: hashedPassword });
    }
  }
}
