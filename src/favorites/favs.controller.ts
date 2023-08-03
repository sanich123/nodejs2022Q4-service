import { Controller, Get, Post, Param, Delete, HttpCode, UnprocessableEntityException } from '@nestjs/common';
import { PATHS } from 'src/utils/const';
import { HttpStatus } from '@nestjs/common';
import { ParamsId } from 'src/app/params-validation';
import { FavsService } from './favs.service';

const { FAVORITES, TRACK, ALBUM, ARTIST } = PATHS;
const { CREATED, NO_CONTENT } = HttpStatus;

@Controller(FAVORITES)
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  async getAllFavorites() {
    return await this.favsService.getAllFavorites();
  }

  @Post(`${TRACK}/:id`)
  @HttpCode(CREATED)
  async addEntityToFavorites(@Param() { id }: ParamsId) {
    const findedTrack = await this.favsService.checkExistenceById(id, TRACK);
    if (!findedTrack) {
      throw new UnprocessableEntityException();
    } else {
      return await this.favsService.createFavEntity(id, TRACK);
    }
  }

  @Delete(`${TRACK}/:id`)
  @HttpCode(NO_CONTENT)
  async deleteTrackFromFavorites(@Param() { id }: ParamsId) {
    return await this.favsService.deleteFavEntity(id, TRACK);
  }

  @Post(`${ALBUM}/:id`)
  @HttpCode(CREATED)
  async addAlbumToFavorites(@Param() { id }: ParamsId) {
    const findedAlbum = await this.favsService.checkExistenceById(id, ALBUM);
    if (!findedAlbum) {
      throw new UnprocessableEntityException();
    } else {
      return await this.favsService.createFavEntity(id, ALBUM);
    }
  }

  @Delete(`${ALBUM}/:id`)
  @HttpCode(NO_CONTENT)
  async deleteAlbumFromFavorites(@Param() { id }: ParamsId) {
    return await this.favsService.deleteFavEntity(id, ALBUM);
  }

  @Post(`${ARTIST}/:id`)
  @HttpCode(CREATED)
  async addArtistToFavorites(@Param() { id }: ParamsId) {
    const findedArtist = await this.favsService.checkExistenceById(id, ARTIST);
    if (!findedArtist) {
      throw new UnprocessableEntityException();
    } else {
      return await this.favsService.createFavEntity(id, ARTIST);
    }
  }

  @Delete(`${ARTIST}/:id`)
  @HttpCode(NO_CONTENT)
  async deleteArtistFromFavorites(@Param() { id }: ParamsId) {
    return await this.favsService.deleteFavEntity(id, ARTIST);
  }
}
