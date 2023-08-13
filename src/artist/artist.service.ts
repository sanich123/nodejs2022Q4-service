import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArtistDto } from './artist.dto';
import { prismaErrorHandling } from 'src/utils/prisma-errors';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll() {
    try {
      return await this.prisma.artist.findMany();
    } catch (error) {
      prismaErrorHandling(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.artist.findUnique({ where: { id } });
    } catch (error) {
      prismaErrorHandling(error);
    }
  }

  async createArtist(createArtistDto: CreateArtistDto) {
    try {
      return await this.prisma.artist.create({ data: createArtistDto });
    } catch (error) {
      prismaErrorHandling(error);
    }
  }

  public async updateArtist(id: string, createArtistDto: CreateArtistDto) {
    try {
      return await this.prisma.artist.update({ where: { id }, data: createArtistDto });
    } catch (error) {
      prismaErrorHandling(error);
    }
  }

  public async deleteArtist(id: string) {
    try {
      return await this.prisma.artist.delete({ where: { id } });
    } catch (error) {
      prismaErrorHandling(error);
    }
  }
}
