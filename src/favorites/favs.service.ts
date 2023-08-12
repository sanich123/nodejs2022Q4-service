import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { prismaErrorHandling } from 'src/utils/prisma-error-handling';

@Injectable()
export class FavsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllFavorites() {
    try {
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
    } catch (error) {
      prismaErrorHandling(error);
    }
  }

  async createFavEntity(entityId: string, place: string) {
    try {
      const updatedEntity = await this.prisma[place].update({ where: { id: entityId }, data: { isFavorite: true } });
      const { id, name, grammy } = updatedEntity;
      return { id, name, grammy };
    } catch (error) {
      prismaErrorHandling(error);
    }
  }

  async deleteFavEntity(id: string, place: string) {
    try {
      return await this.prisma[place].update({ where: { id }, data: { isFavorite: false } });
    } catch (error) {
      prismaErrorHandling(error);
    }
  }
  async checkExistenceById(id: string, place: string) {
    try {
      return await this.prisma[place].findUnique({ where: { id } });
    } catch (error) {
      prismaErrorHandling(error);
    }
  }
}
