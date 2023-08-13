import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(3, { message: 'You login is too short. Valid login must have length not less than 3 symbols' })
  @MaxLength(255, { message: 'You login is too big. Valid login must have length not more than 255 symbols' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'You password is too short. Valid login must have length not less than 3 symbols' })
  @MaxLength(30, { message: 'You password is too short. Valid login must have length not less than 30 symbols' })
  password: string;
}

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

export interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
