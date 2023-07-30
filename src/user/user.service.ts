import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async createUser(createUserDto) {
    const { id, updatedAt, createdAt, login, version } = await this.prisma.user.create({ data: createUserDto });
    return { id, updatedAt, createdAt, login, version };
  }

  async deleteUser(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }

  async updatePassword(newPassword: string, paramsId: string) {
    const { login, version, createdAt, updatedAt, id } = await this.prisma.user.update({
      where: { id: paramsId },
      data: { password: newPassword, version: { increment: 1 } },
    });
    return { login, version, createdAt, updatedAt, id };
  }
}
