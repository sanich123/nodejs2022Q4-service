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
  setNewUser({ login, password }: CreateUserDto) {
    const id = v4();
    const version = 1;
    const createdAt = Date.now();
    const updatedAt = Date.now();
    const userToSave = { login, password, id, version, createdAt, updatedAt };
    this.users.push(userToSave);
    return { id, login, version, createdAt, updatedAt };
  }
  getUserById(userId: string) {
    return this.users.find(({ id }) => userId === id);
  }
  findIndexOfUserById(userId: string) {
    return this.users.findIndex(({ id }) => userId === id);
  }
  setNewPassword(index: number, newPassword: string) {
    this.users[index].version += 1;
    this.users[index].password = newPassword;
    this.users[index].updatedAt = Date.now();
    const { login, version, createdAt, updatedAt, id } = this.users[index];
    return { login, version, createdAt, updatedAt, id };
  }
  deleteUser(index: number) {
    this.users.splice(index, 1);
  }
}
