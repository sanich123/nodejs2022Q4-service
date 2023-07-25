import { Injectable } from '@nestjs/common';
import { USERS_DB } from 'src/database/users-db';

@Injectable()
export class UsersService {
  getAllUsers() {
    return USERS_DB;
  }
}
