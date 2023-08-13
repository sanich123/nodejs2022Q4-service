import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAlbumDto } from 'src/album/album.dto';
import { prismaErrorHandling } from 'src/utils/prisma-errors';

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.album.findMany();
    } catch (error) {
      prismaErrorHandling(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.album.findUnique({ where: { id }, include: { artist: true } });
    } catch (error) {
      prismaErrorHandling(error);
    }
  }

  async createAlbum(createAlbumDto: CreateAlbumDto) {
    try {
      return await this.prisma.album.create({ data: createAlbumDto });
    } catch (error) {
      prismaErrorHandling(error);
    }
  }

  async updateAlbum(id: string, createAlbumDto: CreateAlbumDto) {
    try {
      return await this.prisma.album.update({ where: { id }, data: createAlbumDto });
    } catch (error) {
      prismaErrorHandling(error);
    }
  }

  async deleteAlbum(id: string) {
    try {
      return await this.prisma.album.delete({ where: { id } });
    } catch (error) {
      prismaErrorHandling(error);
    }
  }
}
