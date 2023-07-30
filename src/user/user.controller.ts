import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { MESSAGES, PATHS } from 'src/utils/const';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { DatabaseService } from 'src/database/database.service';
import { UserService } from './user.service';

const { USER } = PATHS;
const { CREATED, NOT_FOUND, FORBIDDEN, OK, NO_CONTENT } = HttpStatus;
const { NOT_FOUND_USER, WRONG_PASSWORD } = MESSAGES;

@Controller(USER)
export class UserController {
  constructor(private readonly dbService: DatabaseService, private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string, @Res() response: Response) {
    const findedUser = await this.userService.findOne(id);
    !findedUser ? response.status(NOT_FOUND).send(NOT_FOUND_USER) : response.send(findedUser);
  }

  @Put(':id')
  async changePassword(
    @Body() { oldPassword, newPassword }: UpdatePasswordDto,
    @Param('id') id: string,
    @Res() response: Response,
  ) {
    const findedUser = await this.userService.findOne(id);
    if (!findedUser) response.status(NOT_FOUND).send(NOT_FOUND_USER);
    else {
      const { password } = findedUser;
      if (password !== oldPassword) {
        response.status(FORBIDDEN).send(WRONG_PASSWORD);
      } else {
        const updatedUser = await this.userService.updatePassword(newPassword, id);
        response.status(OK).send(updatedUser);
      }
    }
  }

  @Post()
  @HttpCode(CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() response: Response) {
    const findedUser = await this.userService.deleteUser(id);
    !findedUser ? response.status(NOT_FOUND).send(NOT_FOUND_USER) : response.status(NO_CONTENT).send();
  }
}
