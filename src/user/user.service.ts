import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './user.dto';
import { getTimeStampFromTime } from 'src/utils/utils';
import { hash } from 'bcrypt';

const { CRYPT_SALT } = process.env;

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findOneByLogin(login: string) {
    return this.prisma.user.findFirst({ where: { login } });
  }

  async createUser(createUserDto: CreateUserDto) {
    const { id, updatedAt, createdAt, login, version } = await this.prisma.user.create({ data: createUserDto });
    const tsCreatedAt = getTimeStampFromTime(createdAt);
    const tsUpdatedAt = getTimeStampFromTime(updatedAt);
    return { id, updatedAt: tsCreatedAt, createdAt: tsUpdatedAt, login, version };
  }

  async deleteUser(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }

  async updatePassword(newPassword: string, paramsId: string) {
    const { login, version, createdAt, updatedAt, id } = await this.prisma.user.update({
      where: { id: paramsId },
      data: { password: newPassword, version: { increment: 1 } },
    });
    const tsCreatedAt = getTimeStampFromTime(createdAt);
    const tsUpdatedAt = getTimeStampFromTime(updatedAt);
    return { login, version, createdAt: tsCreatedAt, updatedAt: tsUpdatedAt, id };
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    const hashedRefreshToken = await hash(refreshToken, +CRYPT_SALT);
    return await this.prisma.user.update({ where: { id }, data: { hashedRefreshToken, version: { increment: 1 } } });
  }
}
