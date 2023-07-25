import { Injectable } from '@nestjs/common';
import { User } from './types';
import { CreateUserDto } from './user.dto';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  getAllUsers(): User[] {
    return this.users;
  }
  setNewUser(createUserDto: CreateUserDto) {
    const id = v4();
    const version = 0;
    const createdAt = Date.now();
    const updatedAt = Date.now();
    const userToSave = { ...createUserDto, id, version, createdAt, updatedAt };
    this.users.push(userToSave);
    return userToSave;
  }
  getUserById(userId: string) {
    return this.users.find(({ id }) => userId === id);
  }
  findIndexOfUserById(userId: string) {
    return this.users.findIndex(({ id }) => userId === id);
  }
  setNewPassword(index: number, newPassword: string) {
    this.users[index].password = newPassword;
    return this.users[index];
  }
  deleteUser(index: number) {
    this.users.splice(index, 1);
  }
}
