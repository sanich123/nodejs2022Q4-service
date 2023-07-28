import { Body, Controller, Get, Post, Res, Param, Put, Delete, HttpCode } from '@nestjs/common/decorators';
import { MESSAGES, PATHS, PLACES, PROPS_TO_DELETE } from 'src/utils/const';
import { CreateAlbumDto } from './album.dto';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ParamsId } from 'src/app/params-validation';

const { ALBUM } = PATHS;
const { ALBUMS, TRACKS } = PLACES;
const { albumId } = PROPS_TO_DELETE;
const { CREATED, NOT_FOUND, OK, NO_CONTENT } = HttpStatus;
const { NOT_FOUND_ALBUM } = MESSAGES;

@Controller(ALBUM)
export class AlbumController {
  constructor(private readonly dbService: DatabaseService) {}

  @Get()
  getAllAlbums() {
    return this.dbService.getAllEntities(ALBUMS);
  }

  @Post()
  @HttpCode(CREATED)
  postNewAlbum(@Body() { name, year, artistId }: CreateAlbumDto) {
    return this.dbService.pushNewEntity(ALBUMS, { name, year, artistId });
  }

  @Get(':id')
  getAlbumById(@Param() { id }: ParamsId, @Res() res: Response) {
    const findedAlbum = this.dbService.getEntityById(ALBUMS, id);
    findedAlbum ? res.status(OK).send(findedAlbum) : res.status(NOT_FOUND).send(NOT_FOUND_ALBUM);
  }

  @Put(':id')
  updateAlbumById(@Body() albumDto: CreateAlbumDto, @Param() { id }: ParamsId, @Res() res: Response) {
    const albumIndex = this.dbService.getIndexEntityById(ALBUMS, id);
    albumIndex !== -1
      ? res.status(OK).send(this.dbService.updateEntityByIndex(ALBUMS, albumIndex, albumDto))
      : res.status(NOT_FOUND).send(NOT_FOUND_ALBUM);
  }

  @Delete(':id')
  deleteAlbumById(@Param() { id }: ParamsId, @Res() res: Response) {
    const findedIndex = this.dbService.getIndexEntityById(ALBUMS, id);
    if (findedIndex === -1) {
      res.status(NOT_FOUND).send(NOT_FOUND_ALBUM);
    } else {
      this.dbService.deleteEntityByIndex(ALBUMS, findedIndex);
      this.dbService.deletePropertyById(TRACKS, id, albumId);
      this.dbService.deleteFavoriteEntityById(ALBUMS, id);
      res.status(NO_CONTENT).send();
    }
  }
}
