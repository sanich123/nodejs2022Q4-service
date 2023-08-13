import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MESSAGES, PATHS } from 'src/utils/const';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { UserService } from './user.service';
import { ParamsId } from 'src/app/params-validation';
import { throwNotFoundException } from 'src/utils/utils';

const { USER } = PATHS;
const { CREATED, NO_CONTENT } = HttpStatus;
const { NOT_FOUND_USER, WRONG_PASSWORD } = MESSAGES;

@Controller(USER)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  async getUserById(@Param() { id }: ParamsId) {
    return (await this.userService.findOne(id)) ?? throwNotFoundException(NOT_FOUND_USER);
  }

  @Put(':id')
  async changePassword(@Body() { oldPassword, newPassword }: UpdatePasswordDto, @Param() { id }: ParamsId) {
    const findedUser = await this.userService.findOne(id);
    if (!findedUser) throw new NotFoundException(NOT_FOUND_USER);
    const { password } = findedUser;
    if (password !== oldPassword) throw new ForbiddenException(WRONG_PASSWORD);
    return await this.userService.updatePassword(newPassword, id);
  }

  @Post()
  @HttpCode(CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Delete(':id')
  @HttpCode(NO_CONTENT)
  async deleteUser(@Param() { id }: ParamsId) {
    return await this.userService.deleteUser(id);
  }
}
