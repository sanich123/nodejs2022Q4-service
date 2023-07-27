import { Controller, Get, Post, Res, Param, Delete } from '@nestjs/common/decorators';
import { MESSAGES, PATHS, PLACES } from 'src/utils/const';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { validate } from 'uuid';
import { ParamsId } from 'src/user/types';
import { DatabaseService } from 'src/database/database.service';

const { FAVORITES, TRACK, ALBUM, ARTIST } = PATHS;
const { FAVS, TRACKS, ALBUMS, ARTISTS } = PLACES;
const { BAD_REQUEST, CREATED, NOT_FOUND, NO_CONTENT, UNPROCESSABLE_ENTITY } = HttpStatus;
const {
  WRONG_TRACK_ID,
  WRONG_ARTIST_ID,
  WRONG_ALBUM_ID,
  ADD_TRACK_TO_FAVORITES,
  ADD_ALBUM_TO_FAVORITES,
  ADD_ARTIST_TO_FAVORITES,
  NOT_FOUND_FAVORITE_TRACK,
  NOT_FOUND_FAVORITE_ALBUM,
  NOT_FOUND_FAVORITES_ARTIST,
  NOT_FOUND_TRACK,
  NOT_FOUND_ALBUM,
  NOT_FOUND_ARTIST,
} = MESSAGES;

@Controller(FAVORITES)
export class FavsController {
  constructor(private readonly dbService: DatabaseService) {}

  @Get()
  getAllFavorites() {
    return this.dbService.getAllEntities(FAVS);
  }

  @Post(`${TRACK}/:id`)
  addTrackToFavorites(@Res() res: Response, @Param() { id }: ParamsId) {
    if (!validate(id)) res.status(BAD_REQUEST).send(WRONG_TRACK_ID);
    else {
      const findedTrack = this.dbService.getEntityById(TRACKS, id);
      if (!findedTrack) {
        res.status(UNPROCESSABLE_ENTITY).send(NOT_FOUND_TRACK);
      } else {
        this.dbService.pushEntityToFavorites(TRACKS, findedTrack);
        res.status(CREATED).send(ADD_TRACK_TO_FAVORITES);
      }
    }
  }

  @Delete(`${TRACK}/:id`)
  deleteTrackFromFavorites(@Res() res: Response, @Param() { id }: ParamsId) {
    if (!validate(id)) res.status(BAD_REQUEST).send(WRONG_TRACK_ID);
    else {
      const findedFavoriteTrackIndex = this.dbService.getIndexOfFavoriteEntity(TRACKS, id);
      if (findedFavoriteTrackIndex !== -1) {
        this.dbService.deleteFavoriteEntityByIndex(TRACKS, findedFavoriteTrackIndex);
        res.status(NO_CONTENT).send();
      } else {
        res.status(NOT_FOUND).send(NOT_FOUND_FAVORITE_TRACK);
      }
    }
  }

  @Post(`${ALBUM}/:id`)
  addAlbumToFavorites(@Res() res: Response, @Param() { id }: ParamsId) {
    if (!validate(id)) res.status(BAD_REQUEST).send(WRONG_ALBUM_ID);
    else {
      const findedAlbum = this.dbService.getEntityById(ALBUMS, id);
      if (!findedAlbum) {
        res.status(UNPROCESSABLE_ENTITY).send(NOT_FOUND_ALBUM);
      } else {
        this.dbService.pushEntityToFavorites(ALBUMS, findedAlbum);
        res.status(CREATED).send(ADD_ALBUM_TO_FAVORITES);
      }
    }
  }

  @Delete(`${ALBUM}/:id`)
  deleteAlbumFromFavorites(@Res() res: Response, @Param() { id }: ParamsId) {
    if (!validate(id)) res.status(BAD_REQUEST).send(WRONG_ALBUM_ID);
    else {
      const findedFavoriteAlbumIndex = this.dbService.getIndexOfFavoriteEntity(ALBUMS, id);
      if (findedFavoriteAlbumIndex !== -1) {
        this.dbService.deleteFavoriteEntityByIndex(ALBUMS, findedFavoriteAlbumIndex);
        res.status(NO_CONTENT).send();
      } else {
        res.status(NOT_FOUND).send(NOT_FOUND_FAVORITE_ALBUM);
      }
    }
  }

  @Post(`${ARTIST}/:id`)
  addArtistToFavorites(@Res() res: Response, @Param() { id }: ParamsId) {
    if (!validate(id)) res.status(BAD_REQUEST).send(WRONG_ARTIST_ID);
    else {
      const findedArtist = this.dbService.getEntityById(ARTISTS, id);
      if (!findedArtist) {
        res.status(UNPROCESSABLE_ENTITY).send(NOT_FOUND_ARTIST);
      } else {
        this.dbService.pushEntityToFavorites(ARTISTS, findedArtist);
        res.status(CREATED).send(ADD_ARTIST_TO_FAVORITES);
      }
    }
  }

  @Delete(`${ARTIST}/:id`)
  deleteArtistFromFavorites(@Res() res: Response, @Param() { id }: ParamsId) {
    if (!validate(id)) res.status(BAD_REQUEST).send(WRONG_ARTIST_ID);
    else {
      const findedFavoriteArtistIndex = this.dbService.getIndexOfFavoriteEntity(ARTISTS, id);
      if (findedFavoriteArtistIndex !== -1) {
        this.dbService.deleteFavoriteEntityByIndex(ARTISTS, findedFavoriteArtistIndex);
        res.status(NO_CONTENT).send();
      } else {
        res.status(NOT_FOUND).send(NOT_FOUND_FAVORITES_ARTIST);
      }
    }
  }
}
