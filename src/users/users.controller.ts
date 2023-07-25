import { Controller, Get } from '@nestjs/common';

@Controller()
export class UsersController {
  constructor(private readonly usersService) {}

  @Get()
  getUsers() {
    return 'users';
  }
}
