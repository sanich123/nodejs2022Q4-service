import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllFavorites() {
    const artists = await this.prisma.artist.findMany({ where: { isFavorite: true } });
    const albums = await this.prisma.album.findMany({ where: { isFavorite: true } });
    const tracks = await this.prisma.track.findMany({ where: { isFavorite: true } });
    const artistsDTO = artists.length > 1 ? artists : { ...artists };
    const albumsDTO = albums.length > 1 ? albums : { ...albums };
    const tracksDTO = tracks.length > 1 ? tracks : { ...tracks };
    return { artists: artistsDTO, albums: albumsDTO, tracks: tracksDTO };
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
