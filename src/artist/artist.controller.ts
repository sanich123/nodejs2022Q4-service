import { Body, Controller, Get, Post, Res, Param, Put, Delete } from '@nestjs/common/decorators';
import { ArtistService } from './artist.service';
import { MESSAGES, PATHS } from 'src/utils/const';
import { CreateArtistDto } from './artist.dto';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import { ParamsId } from 'src/user/types';
import { validate } from 'uuid';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';

const { ARTIST } = PATHS;
const { BAD_REQUEST, CREATED, NOT_FOUND, OK, NO_CONTENT } = HttpStatus;
const { BAD_BODY, WRONG_ID, NOT_FOUND_ARTIST } = MESSAGES;

@Controller()
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {}

  @Get(ARTIST)
  getArtists() {
    return this.artistService.getAllArtists();
  }

  @Post(ARTIST)
  createArtist(@Body() { name, grammy }: CreateArtistDto, @Res() res: Response) {
    if (!name || typeof name !== 'string' || typeof grammy !== 'boolean') {
      res.status(BAD_REQUEST).send(BAD_BODY);
    } else {
      const createdArtist = this.artistService.saveArtist({ name, grammy });
      res.status(CREATED).send(createdArtist);
    }
  }

  @Get(`${ARTIST}/:id`)
  getArtistById(@Param() { id }: ParamsId, @Res() res: Response) {
    if (!validate(id)) res.status(BAD_REQUEST).send(WRONG_ID);
    else {
      const findedArtist = this.artistService.getArtistById(id);
      findedArtist ? res.status(OK).send(findedArtist) : res.status(NOT_FOUND).send(NOT_FOUND_ARTIST);
    }
  }

  @Put(`${ARTIST}/:id`)
  updateArtistByIndex(@Body() artistDto: CreateArtistDto, @Param() { id }: ParamsId, @Res() res: Response) {
    const { name, grammy } = artistDto;
    if (!validate(id)) {
      res.status(BAD_REQUEST).send(WRONG_ID);
    } else if ((name && typeof name !== 'string') || (grammy && typeof grammy !== 'boolean')) {
      res.status(BAD_REQUEST).send(BAD_BODY);
    } else {
      const artistIndex = this.artistService.getArtistIndexById(id);
      artistIndex !== -1
        ? res.status(OK).send(this.artistService.updateArtistByIndex(artistIndex, artistDto))
        : res.status(NOT_FOUND).send(NOT_FOUND_ARTIST);
    }
  }

  @Delete(`${ARTIST}/:id`)
  deleteArtistById(@Param() { id }: ParamsId, @Res() res: Response) {
    if (!validate(id)) res.status(BAD_REQUEST).send(WRONG_ID);
    else {
      const findedIndex = this.artistService.getArtistIndexById(id);
      if (findedIndex === -1) {
        res.status(NOT_FOUND).send(NOT_FOUND_ARTIST);
      } else {
        this.artistService.deleteArtistById(findedIndex);
        this.trackService.updateArtistIdAfterDeletingArtist(id);
        this.albumService.updateArtistIdAfterDeletingArtist(id);
        res.status(NO_CONTENT).send();
      }
    }
  }
}
