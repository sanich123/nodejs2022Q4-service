import { Controller, HttpCode, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpStatus } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { Public } from './public';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() { login, password }: CreateUserDto) {
    return await this.authService.signUp(login, password);
  }

  @Public()
  @Post('/login')
  async signIn(@Body() { login, password }: CreateUserDto) {
    return await this.authService.signIn(login, password);
  }
}
