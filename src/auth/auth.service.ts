import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { MESSAGES } from 'src/utils/const';

const { NON_EXISTING_LOGIN, DIDNT_MATCH_PASSWORDS, ALREADY_EXIST_LOGIN } = MESSAGES;
const { CRYPT_SALT } = process.env;

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async logIn(login: string, password: string) {
    const user = await this.userService.findOneByLogin(login);
    if (!user) throw new BadRequestException(NON_EXISTING_LOGIN);
    const { id, password: dbPassword } = user;
    const match = await compare(password, dbPassword);
    if (!match) throw new UnauthorizedException(DIDNT_MATCH_PASSWORDS);

    const payload = { userId: id, login };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(login: string, password: string) {
    const user = await this.userService.findOneByLogin(login);
    if (user) throw new ConflictException(ALREADY_EXIST_LOGIN);

    const hashedPassword = await hash(password, +CRYPT_SALT);

    return await this.userService.createUser({ login, password: hashedPassword });
  }
}
