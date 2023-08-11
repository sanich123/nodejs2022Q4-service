import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAlbumDto } from 'src/album/album.dto';
import { MESSAGES } from 'src/utils/const';

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}
  public async findAll() {
    return await this.prisma.album.findMany();
  }
  public async findOne(id: string) {
    return await this.prisma.album.findUnique({ where: { id }, include: { artist: true } });
  }
  public async createAlbum(createAlbumDto: CreateAlbumDto) {
    return await this.prisma.album.create({ data: createAlbumDto });
  }
  public async updateAlbum(id: string, createAlbumDto: CreateAlbumDto) {
    try {
      return await this.prisma.album.update({ where: { id }, data: createAlbumDto });
    } catch (error) {
      throw new NotFoundException(MESSAGES.NOT_FOUND_ALBUM);
    }
  }
  public async deleteAlbum(id: string) {
    try {
      return await this.prisma.album.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(MESSAGES.NOT_FOUND_ALBUM);
    }
  }
}
