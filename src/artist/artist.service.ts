import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArtistDto } from './artist.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.artist.findUnique({ where: { id } });
  }

  async createArtist(createArtistDto: CreateArtistDto) {
    return await this.prisma.artist.create({ data: createArtistDto });
  }

  async updateArtist(id: string, createArtistDto: CreateArtistDto) {
    return await this.prisma.artist.update({ where: { id }, data: createArtistDto });
  }

  async deleteArtist(id: string) {
    return await this.prisma.artist.delete({ where: { id } });
  }
}
