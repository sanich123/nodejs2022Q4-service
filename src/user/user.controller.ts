import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
  Param,
  Res,
  Put,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { User, ParamsId } from './types';
import { MESSAGES, PATHS } from 'src/utils/const';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { validate } from 'uuid';

const { USER } = PATHS;
const { BAD_REQUEST, CREATED, NOT_FOUND, FORBIDDEN, OK, NO_CONTENT } = HttpStatus;
const { WRONG_ID, NOT_FOUND_USER, WRONG_PASSWORD, EMPTY_FIELDS } = MESSAGES;

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(USER)
  getUsers(): User[] {
    return this.userService.getAllUsers();
  }

  @Get(`${USER}/:id`)
  getUserById(@Param() { id }: ParamsId, @Res() response: Response) {
    if (!validate(id)) response.status(BAD_REQUEST).send(WRONG_ID);
    else if (!this.userService.getUserById(id)) response.status(NOT_FOUND).send(NOT_FOUND_USER);
    else response.send(this.userService.getUserById(id));
  }

  @Put(`${USER}/:id`)
  changePassword(
    @Body() { oldPassword, newPassword }: UpdatePasswordDto,
    @Param() { id }: ParamsId,
    @Res() response: Response,
  ) {
    const findedIndex = this.userService.findIndexOfUserById(id);
    if (!validate(id)) response.status(BAD_REQUEST).send(WRONG_ID);
    else if (!oldPassword || !newPassword) response.status(BAD_REQUEST).send(EMPTY_FIELDS);
    else if (findedIndex === -1) response.status(NOT_FOUND).send(NOT_FOUND_USER);
    else if (findedIndex !== -1) {
      const { password } = this.userService.getAllUsers()[findedIndex];
      if (password !== oldPassword) {
        response.status(FORBIDDEN).send(WRONG_PASSWORD);
      } else {
        const updatedUser = this.userService.setNewPassword(findedIndex, newPassword);
        response.status(OK).send(updatedUser);
      }
    }
  }

  @Post(USER)
  @HttpCode(CREATED)
  createUser(@Body() { login, password }: CreateUserDto) {
    if (!login || !password) throw new HttpException(MESSAGES.BAD_BODY, BAD_REQUEST);
    else return this.userService.setNewUser({ login, password });
  }

  @Delete(`${USER}/:id`)
  @HttpCode(NO_CONTENT)
  deleteUser(@Param() { id }: ParamsId, @Res() response: Response) {
    const findedIndex = this.userService.findIndexOfUserById(id);
    if (!validate(id)) response.status(BAD_REQUEST).send(WRONG_ID);
    else if (findedIndex === -1) response.status(NOT_FOUND).send(NOT_FOUND_USER);
    else {
      this.userService.deleteUser(findedIndex);
      response.status(NO_CONTENT).send();
    }
  }
}
