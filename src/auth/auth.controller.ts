import { Controller, HttpCode, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpStatus } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { Public } from './public';
import { PATHS } from 'src/utils/const';

const { AUTH, SIGNUP, LOGIN } = PATHS;

@Controller(AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post(SIGNUP)
  @HttpCode(HttpStatus.NO_CONTENT)
  async signUp(@Body() { login, password }: CreateUserDto) {
    return await this.authService.signUp(login, password);
  }

  @Public()
  @Post(LOGIN)
  async logIn(@Body() { login, password }: CreateUserDto) {
    return await this.authService.logIn(login, password);
  }
}
