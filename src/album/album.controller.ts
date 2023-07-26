import { Body, Controller, Get, Post, Res, Param, Put, Delete } from '@nestjs/common/decorators';
import { AlbumService } from './album.service';
import { MESSAGES, PATHS } from 'src/utils/const';
import { CreateAlbumDto } from './album.dto';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import { ParamsId } from 'src/user/types';
import { validate } from 'uuid';
import { TrackService } from 'src/track/track.service';

const { ALBUM } = PATHS;
const { BAD_REQUEST, CREATED, NOT_FOUND, OK, NO_CONTENT } = HttpStatus;
const { BAD_BODY, WRONG_ID, NOT_FOUND_ALBUM } = MESSAGES;

@Controller()
export class AlbumController {
  constructor(private readonly albumService: AlbumService, private readonly trackService: TrackService) {}

  @Get(ALBUM)
  getAllAlbums() {
    return this.albumService.getAllAlbums();
  }

  @Post(ALBUM)
  postNewAlbum(@Body() { name, year, artistId }: CreateAlbumDto, @Res() res: Response) {
    if (
      !name ||
      !year ||
      typeof name !== 'string' ||
      typeof year !== 'number' ||
      (artistId && typeof artistId !== 'string')
    ) {
      res.status(BAD_REQUEST).send(BAD_BODY);
    } else {
      res.status(CREATED).send(this.albumService.setNewAlbum({ name, year, artistId }));
    }
  }

  @Get(`${ALBUM}/:id`)
  getAlbumById(@Param() { id }: ParamsId, @Res() res: Response) {
    if (!validate(id)) res.status(BAD_REQUEST).send(WRONG_ID);
    else {
      const findedAlbum = this.albumService.getAlbumById(id);
      findedAlbum ? res.status(OK).send(findedAlbum) : res.status(NOT_FOUND).send(NOT_FOUND_ALBUM);
    }
  }

  @Put(`${ALBUM}/:id`)
  updateAlbumById(@Body() albumDto: CreateAlbumDto, @Param() { id }: ParamsId, @Res() res: Response) {
    const { name, year, artistId } = albumDto;
    if (!validate(id)) res.status(BAD_REQUEST).send(WRONG_ID);
    else if (
      (name && typeof name !== 'string') ||
      (year && typeof year !== 'number') ||
      (artistId && typeof artistId !== 'string')
    ) {
      res.status(BAD_REQUEST).send(BAD_BODY);
    } else {
      const albumIndex = this.albumService.getAlbumIndexById(id);
      albumIndex !== -1
        ? res.status(OK).send(this.albumService.updateAlbumByIndex(albumIndex, albumDto))
        : res.status(NOT_FOUND).send(NOT_FOUND_ALBUM);
    }
  }

  @Delete(`${ALBUM}/:id`)
  deleteAlbumById(@Param() { id }: ParamsId, @Res() res: Response) {
    if (!validate(id)) res.status(BAD_REQUEST).send(WRONG_ID);
    else {
      const findedIndex = this.albumService.getAlbumIndexById(id);
      if (findedIndex === -1) {
        res.status(NOT_FOUND).send(NOT_FOUND_ALBUM);
      } else {
        this.albumService.deleteAlbumById(findedIndex);
        this.trackService.updateAlbumIdAfterDeletingAlbum(id);
        res.status(NO_CONTENT).send();
      }
    }
  }
}
