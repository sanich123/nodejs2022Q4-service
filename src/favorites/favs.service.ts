import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllFavorites() {
    const artists = await this.prisma.artist.findMany({
      where: { isFavorite: true },
      select: { name: true, id: true, grammy: true },
    });
    const albums = await this.prisma.album.findMany({
      where: { isFavorite: true },
      select: {
        name: true,
        year: true,
        artistId: true,
        id: true,
      },
    });
    const tracks = await this.prisma.track.findMany({
      where: { isFavorite: true },
      select: {
        id: true,
        name: true,
        duration: true,
        artistId: true,
        albumId: true,
      },
    });
    return {
      artists: artists,
      albums: albums,
      tracks: tracks,
    };
  }

  async createFavEntity(entityId: string, place: string) {
    const updatedEntity = await this.prisma[place].update({ where: { id: entityId }, data: { isFavorite: true } });
    const { id, name, grammy } = updatedEntity;
    return { id, name, grammy };
  }

  async deleteFavEntity(id: string, place: string) {
    return this.prisma[place].update({ where: { id }, data: { isFavorite: false } });
  }
  async checkExistenceById(id: string, place: string) {
    return this.prisma[place].findUnique({ where: { id } });
  }
}
