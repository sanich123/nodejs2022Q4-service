import { Body, Controller, Get, Post, Res, Param, Put, Delete, HttpCode } from '@nestjs/common/decorators';
import { MESSAGES, PATHS, PLACES, PROPS_TO_DELETE } from 'src/utils/const';
import { CreateArtistDto } from './artist.dto';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ParamsId } from 'src/app/params-validation';

const { ARTIST } = PATHS;
const { ARTISTS, TRACKS, ALBUMS } = PLACES;
const { artistId } = PROPS_TO_DELETE;
const { CREATED, NOT_FOUND, OK, NO_CONTENT } = HttpStatus;
const { NOT_FOUND_ARTIST } = MESSAGES;

@Controller(ARTIST)
export class ArtistController {
  constructor(private readonly dbService: DatabaseService) {}

  @Get()
  getArtists() {
    return this.dbService.getAllEntities(ARTISTS);
  }

  @Post()
  @HttpCode(CREATED)
  createArtist(@Body() { name, grammy }: CreateArtistDto) {
    return this.dbService.pushNewEntity(ARTISTS, { name, grammy });
  }

  @Get(':id')
  getArtistById(@Param() { id }: ParamsId, @Res() res: Response) {
    const findedArtist = this.dbService.getEntityById(ARTISTS, id);
    findedArtist ? res.status(OK).send(findedArtist) : res.status(NOT_FOUND).send(NOT_FOUND_ARTIST);
  }

  @Put(':id')
  updateArtistByIndex(@Body() artistDto: CreateArtistDto, @Param() { id }: ParamsId, @Res() res: Response) {
    const artistIndex = this.dbService.getIndexEntityById(ARTISTS, id);
    artistIndex !== -1
      ? res.status(OK).send(this.dbService.updateEntityByIndex(ARTISTS, artistIndex, artistDto))
      : res.status(NOT_FOUND).send(NOT_FOUND_ARTIST);
  }

  @Delete(':id')
  deleteArtistById(@Param() { id }: ParamsId, @Res() res: Response) {
    const findedIndex = this.dbService.getIndexEntityById(ARTISTS, id);
    if (findedIndex === -1) {
      res.status(NOT_FOUND).send(NOT_FOUND_ARTIST);
    } else {
      this.dbService.deleteEntityByIndex(ARTISTS, findedIndex);
      [TRACKS, ALBUMS].map((place) => this.dbService.deletePropertyById(place, id, artistId));
      this.dbService.deleteFavoriteEntityById(ARTISTS, id);
      res.status(NO_CONTENT).send();
    }
  }
}
