import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { User, ParamsId } from './types';
import { MESSAGES, PATHS } from 'src/utils/const';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { validate } from 'uuid';
import { DatabaseService } from 'src/database/database.service';

const { USER } = PATHS;
const { BAD_REQUEST, CREATED, NOT_FOUND, FORBIDDEN, OK, NO_CONTENT } = HttpStatus;
const { WRONG_ID, NOT_FOUND_USER, WRONG_PASSWORD, EMPTY_FIELDS } = MESSAGES;

@Controller(USER)
export class UserController {
  constructor(private readonly dbService: DatabaseService) {}

  @Get()
  getUsers(): User[] {
    return this.dbService.getAllEntities('users');
  }

  @Get(`:id`)
  getUserById(@Param() { id }: ParamsId, @Res() response: Response) {
    if (!validate(id)) response.status(BAD_REQUEST).send(WRONG_ID);
    else {
      const findedUser = this.dbService.getEntityById('users', id);
      if (!findedUser) {
        response.status(NOT_FOUND).send(NOT_FOUND_USER);
      } else {
        response.send(findedUser);
      }
    }
  }

  @Put(`:id`)
  changePassword(
    @Body() { oldPassword, newPassword }: UpdatePasswordDto,
    @Param() { id }: ParamsId,
    @Res() response: Response,
  ) {
    if (!validate(id)) response.status(BAD_REQUEST).send(WRONG_ID);
    else if (!oldPassword || !newPassword) response.status(BAD_REQUEST).send(EMPTY_FIELDS);
    else {
      const findedIndex = this.dbService.getIndexEntityById('users', id);
      if (findedIndex === -1) response.status(NOT_FOUND).send(NOT_FOUND_USER);
      else if (findedIndex !== -1) {
        const { password } = this.dbService.getAllEntities('users')[findedIndex];
        if (password !== oldPassword) {
          response.status(FORBIDDEN).send(WRONG_PASSWORD);
        } else {
          const updatedUser = this.dbService.updatePassword('users', findedIndex, newPassword);
          response.status(OK).send(updatedUser);
        }
      }
    }
  }

  @Post()
  @HttpCode(CREATED)
  createUser(@Body() { login, password }: CreateUserDto, @Res() res: Response) {
    !login || !password
      ? res.status(BAD_REQUEST).send(MESSAGES.BAD_BODY)
      : res.status(CREATED).send(this.dbService.setNewUser({ login, password }));
  }

  @Delete(`:id`)
  deleteUser(@Param() { id }: ParamsId, @Res() response: Response) {
    const findedIndex = this.dbService.getIndexEntityById('users', id);
    if (!validate(id)) response.status(BAD_REQUEST).send(WRONG_ID);
    else if (findedIndex === -1) response.status(NOT_FOUND).send(NOT_FOUND_USER);
    else {
      this.dbService.deleteEntityByIndex('users', findedIndex);
      response.status(NO_CONTENT).send();
    }
  }
}
