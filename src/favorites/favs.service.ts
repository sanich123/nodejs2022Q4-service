import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MESSAGES } from 'src/utils/const';

@Injectable()
export class FavsService {
  constructor(private readonly prisma: PrismaService) {}

  public async getAllFavorites() {
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

  public async createFavEntity(entityId: string, place: string) {
    try {
      const updatedEntity = await this.prisma[place].update({ where: { id: entityId }, data: { isFavorite: true } });
      const { id, name, grammy } = updatedEntity;
      return { id, name, grammy };
    } catch (error) {
      throw new NotFoundException(MESSAGES.NOT_FOUND_FAVORITE);
    }
  }

  public async deleteFavEntity(id: string, place: string) {
    try {
      return this.prisma[place].update({ where: { id }, data: { isFavorite: false } });
    } catch (error) {
      throw new NotFoundException(MESSAGES.NOT_FOUND_FAVORITE);
    }
  }
  public async checkExistenceById(id: string, place: string) {
    return this.prisma[place].findUnique({ where: { id } });
  }
}
