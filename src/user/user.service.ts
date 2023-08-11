import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './user.dto';
import { getTimeStampFromTime } from 'src/utils/utils';
import { hash } from 'bcrypt';
import { MESSAGES } from 'src/utils/const';

const { CRYPT_SALT } = process.env;

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll() {
    return this.prisma.user.findMany();
  }

  public async findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  public async findOneByLogin(login: string) {
    return this.prisma.user.findFirst({ where: { login } });
  }

  public async createUser(createUserDto: CreateUserDto) {
    const { id, updatedAt, createdAt, login, version } = await this.prisma.user.create({ data: createUserDto });
    const tsCreatedAt = getTimeStampFromTime(createdAt);
    const tsUpdatedAt = getTimeStampFromTime(updatedAt);
    return { id, updatedAt: tsCreatedAt, createdAt: tsUpdatedAt, login, version };
  }

  public async deleteUser(id: string) {
    try {
      return await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(MESSAGES.NOT_FOUND_USER);
    }
  }

  public async updatePassword(newPassword: string, paramsId: string) {
    const { login, version, createdAt, updatedAt, id } = await this.prisma.user.update({
      where: { id: paramsId },
      data: { password: newPassword, version: { increment: 1 } },
    });
    const tsCreatedAt = getTimeStampFromTime(createdAt);
    const tsUpdatedAt = getTimeStampFromTime(updatedAt);
    return { login, version, createdAt: tsCreatedAt, updatedAt: tsUpdatedAt, id };
  }

  public async updateRefreshToken(id: string, refreshToken: string) {
    const hashedRefreshToken = await hash(refreshToken, +CRYPT_SALT);
    return await this.prisma.user.update({ where: { id }, data: { hashedRefreshToken, version: { increment: 1 } } });
  }
}
