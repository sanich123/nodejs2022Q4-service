import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAlbumDto } from 'src/album/album.dto';

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.album.findMany();
  }
  async findOne(id: string) {
    return await this.prisma.album.findUnique({ where: { id }, include: { artist: true } });
  }
  async createAlbum(createAlbumDto: CreateAlbumDto) {
    return await this.prisma.album.create({
      data: createAlbumDto,
    });
  }
  async updateAlbum(id: string, createAlbumDto: CreateAlbumDto) {
    return await this.prisma.album.update({ where: { id }, data: createAlbumDto });
  }
  async deleteAlbum(id: string) {
    return await this.prisma.album.delete({ where: { id } });
  }
}
