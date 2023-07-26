import { Body, Controller, Get, Post, Res } from '@nestjs/common/decorators';
import { ArtistService } from './artist.service';
import { MESSAGES, PATHS } from 'src/utils/const';
import { CreateArtistDto } from './artist.dto';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import { ParamsId } from 'src/user/types';

const { ARTIST } = PATHS;
const { BAD_REQUEST, CREATED, NOT_FOUND, OK, NO_CONTENT } = HttpStatus;
const { BAD_BODY, WRONG_ID, NOT_FOUND_TRACK } = MESSAGES;

@Controller()
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get(ARTIST)
  getArtists() {
    return this.artistService.getAllArtists();
  }

  @Post(ARTIST)
  createArtist(
    @Body() { name, grammy }: CreateArtistDto,
    @Res() res: Response,
  ) {
    if (!name || !grammy) {
      res.status(BAD_REQUEST).send(BAD_BODY);
    } else {
      const createdArtist = this.artistService.saveArtist({ name, grammy });
      res.status(CREATED).send(createdArtist);
    }
  }

  @Get(`${ARTIST}/:id`)
  getArtistById(@Param() { id }: ParamsId) {}
}
