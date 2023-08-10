import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { MESSAGES } from 'src/utils/const';
import * as jwt from 'jsonwebtoken';
import * as ms from 'ms';

const { NON_EXISTING_LOGIN, DIDNT_MATCH_PASSWORDS, ALREADY_EXIST_LOGIN, WRONG_TOKEN, NOT_FOUND_USER } = MESSAGES;
const { CRYPT_SALT } = process.env;
const { JWT_SECRET_REFRESH_KEY, TOKEN_REFRESH_EXPIRE_TIME } = process.env;

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async logIn(login: string, password: string) {
    const user = await this.userService.findOneByLogin(login);
    if (!user) throw new BadRequestException(NON_EXISTING_LOGIN);

    const { id, password: dbPassword } = user;
    const match = await compare(password, dbPassword);

    if (!match) throw new UnauthorizedException(DIDNT_MATCH_PASSWORDS);
    return await this.getTokens(id);
  }

  async signUp(login: string, password: string) {
    const user = await this.userService.findOneByLogin(login);
    if (user) throw new ConflictException(ALREADY_EXIST_LOGIN);

    const hashedPassword = await hash(password, +CRYPT_SALT);

    return await this.userService.createUser({ login, password: hashedPassword });
  }

  async validateToken(refreshToken: string) {
    try {
      const { id } = await this.jwtService.verifyAsync(refreshToken);
      const user = await this.userService.findOne(id);
      if (!user) throw new NotFoundException(NOT_FOUND_USER);
      const { hashedRefreshToken } = user;
      const matchedRefreshToken = await compare(refreshToken, hashedRefreshToken);
      if (!matchedRefreshToken) throw new ForbiddenException(WRONG_TOKEN);
      return await this.getTokens(id);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async getTokens(id: string) {
    const accessToken = await this.jwtService.signAsync({ id });
    const refreshToken = jwt.sign({ id }, JWT_SECRET_REFRESH_KEY, { expiresIn: ms(TOKEN_REFRESH_EXPIRE_TIME) });
    await this.userService.updateRefreshToken(id, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }
}
