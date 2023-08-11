import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArtistDto } from './artist.dto';
import { MESSAGES } from 'src/utils/const';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll() {
    return await this.prisma.artist.findMany();
  }

  public async findOne(id: string) {
    return await this.prisma.artist.findUnique({ where: { id } });
  }

  public async createArtist(createArtistDto: CreateArtistDto) {
    return await this.prisma.artist.create({ data: createArtistDto });
  }

  public async updateArtist(id: string, createArtistDto: CreateArtistDto) {
    try {
      return await this.prisma.artist.update({ where: { id }, data: createArtistDto });
    } catch {
      throw new NotFoundException(MESSAGES.NOT_FOUND_ARTIST);
    }
  }

  public async deleteArtist(id: string) {
    try {
      return await this.prisma.artist.delete({ where: { id } });
    } catch {
      throw new NotFoundException(MESSAGES.NOT_FOUND_ARTIST);
    }
  }
}
