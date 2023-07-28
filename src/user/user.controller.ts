import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { MESSAGES, PATHS, PLACES } from 'src/utils/const';
import { CreateUserDto, UpdatePasswordDto, User } from './user.dto';
import { DatabaseService } from 'src/database/database.service';
import { ParamsId } from 'src/app/params-validation';

const { USER } = PATHS;
const { USERS } = PLACES;
const { CREATED, NOT_FOUND, FORBIDDEN, OK, NO_CONTENT } = HttpStatus;
const { NOT_FOUND_USER, WRONG_PASSWORD } = MESSAGES;

@Controller(USER)
export class UserController {
  constructor(private readonly dbService: DatabaseService) {}

  @Get()
  getUsers(): User[] {
    return this.dbService.getAllEntities(USERS);
  }

  @Get(':id')
  getUserById(@Param() { id }: ParamsId, @Res() response: Response) {
    const findedUser = this.dbService.getEntityById(USERS, id);
    !findedUser ? response.status(NOT_FOUND).send(NOT_FOUND_USER) : response.send(findedUser);
  }

  @Put(':id')
  changePassword(
    @Body() { oldPassword, newPassword }: UpdatePasswordDto,
    @Param() { id }: ParamsId,
    @Res() response: Response,
  ) {
    const findedIndex = this.dbService.getIndexEntityById(USERS, id);
    if (findedIndex === -1) response.status(NOT_FOUND).send(NOT_FOUND_USER);
    else {
      const { password } = this.dbService.getAllEntities(USERS)[findedIndex];
      password !== oldPassword
        ? response.status(FORBIDDEN).send(WRONG_PASSWORD)
        : response.status(OK).send(this.dbService.updatePassword(USERS, findedIndex, newPassword));
    }
  }

  @Post()
  @HttpCode(CREATED)
  createUser(@Body() { login, password }: CreateUserDto) {
    return this.dbService.setNewUser({ login, password });
  }

  @Delete(':id')
  deleteUser(@Param() { id }: ParamsId, @Res() response: Response) {
    const findedIndex = this.dbService.getIndexEntityById(USERS, id);
    if (findedIndex === -1) response.status(NOT_FOUND).send(NOT_FOUND_USER);
    else {
      this.dbService.deleteEntityByIndex(USERS, findedIndex);
      response.status(NO_CONTENT).send();
    }
  }
}
