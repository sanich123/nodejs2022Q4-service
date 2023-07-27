import { Controller, Get, Post, Res, Param, Delete } from '@nestjs/common/decorators';
import { FavsService } from './favs.service';
import { MESSAGES, PATHS } from 'src/utils/const';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { validate } from 'uuid';
import { ParamsId } from 'src/user/types';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';

const { FAVORITES, TRACK, ALBUM, ARTIST } = PATHS;
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

@Controller()
export class FavsController {
  constructor(
    private readonly favsService: FavsService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  @Get(FAVORITES)
  getAllFavorites() {
    return this.favsService.getAllFavorites();
  }

  @Post(`${FAVORITES}/${TRACK}/:id`)
  addTrackToFavorites(@Res() res: Response, @Param() { id }: ParamsId) {
    if (!validate(id)) res.status(BAD_REQUEST).send(WRONG_TRACK_ID);
    else {
      const findedTrack = this.trackService.getTrackById(id);
      if (!findedTrack) {
        res.status(UNPROCESSABLE_ENTITY).send(NOT_FOUND_TRACK);
      } else {
        this.favsService.setTrackToFavorites(findedTrack);
        res.status(CREATED).send(ADD_TRACK_TO_FAVORITES);
      }
    }
  }

  @Delete(`${FAVORITES}/${TRACK}/:id`)
  deleteTrackFromFavorites(@Res() res: Response, @Param() { id }: ParamsId) {
    if (!validate(id)) res.status(BAD_REQUEST).send(WRONG_TRACK_ID);
    else {
      const findedFavoriteTrackIndex = this.favsService.getIndexFavoriteTrackById(id);
      if (findedFavoriteTrackIndex !== -1) {
        this.favsService.deleteFavoriteTrackByIndex(findedFavoriteTrackIndex);
        res.status(NO_CONTENT).send();
      } else {
        res.status(NOT_FOUND).send(NOT_FOUND_FAVORITE_TRACK);
      }
    }
  }

  @Post(`${FAVORITES}/${ALBUM}/:id`)
  addAlbumToFavorites(@Res() res: Response, @Param() { id }: ParamsId) {
    if (!validate(id)) res.status(BAD_REQUEST).send(WRONG_ALBUM_ID);
    else {
      const findedAlbum = this.albumService.getAlbumById(id);
      if (!findedAlbum) {
        res.status(UNPROCESSABLE_ENTITY).send(NOT_FOUND_ALBUM);
      } else {
        this.favsService.setAlbumToFavorites(findedAlbum);
        res.status(CREATED).send(ADD_ALBUM_TO_FAVORITES);
      }
    }
  }

  @Delete(`${FAVORITES}/${ALBUM}/:id`)
  deleteAlbumFromFavorites(@Res() res: Response, @Param() { id }: ParamsId) {
    if (!validate(id)) res.status(BAD_REQUEST).send(WRONG_ALBUM_ID);
    else {
      const findedFavoriteAlbumIndex = this.favsService.getIndexFavoriteAlbumById(id);
      if (findedFavoriteAlbumIndex !== -1) {
        this.favsService.deleteFavoriteAlbumByIndex(findedFavoriteAlbumIndex);
        res.status(NO_CONTENT).send();
      } else {
        res.status(NOT_FOUND).send(NOT_FOUND_FAVORITE_ALBUM);
      }
    }
  }

  @Post(`${FAVORITES}/${ARTIST}/:id`)
  addArtistToFavorites(@Res() res: Response, @Param() { id }: ParamsId) {
    if (!validate(id)) res.status(BAD_REQUEST).send(WRONG_ARTIST_ID);
    else {
      const findedArtist = this.artistService.getArtistById(id);
      if (!findedArtist) {
        res.status(UNPROCESSABLE_ENTITY).send(NOT_FOUND_ARTIST);
      } else {
        this.favsService.setArtistToFavorites(findedArtist);
        res.status(CREATED).send(ADD_ARTIST_TO_FAVORITES);
      }
    }
  }

  @Delete(`${FAVORITES}/${ARTIST}/:id`)
  deleteArtistFromFavorites(@Res() res: Response, @Param() { id }: ParamsId) {
    if (!validate(id)) res.status(BAD_REQUEST).send(WRONG_ARTIST_ID);
    else {
      const findedFavoriteArtistIndex = this.favsService.getIndexFavoriteArtistById(id);
      if (findedFavoriteArtistIndex !== -1) {
        this.favsService.deleteFavoriteArtistByIndex(findedFavoriteArtistIndex);
        res.status(NO_CONTENT).send();
      } else {
        res.status(NOT_FOUND).send(NOT_FOUND_FAVORITES_ARTIST);
      }
    }
  }
}
