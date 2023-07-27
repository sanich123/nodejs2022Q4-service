import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { MESSAGES, PATHS, PLACES } from 'src/utils/const';
import { CreateTrackDto } from './track.dto';
import { Response } from 'express';
import { ParamsId } from 'src/user/types';
import { validate } from 'uuid';
import { checkPropertiesInTrackDto } from 'src/utils/utils';
import { DatabaseService } from 'src/database/database.service';

const { TRACK } = PATHS;
const { TRACKS } = PLACES;
const { BAD_REQUEST, CREATED, NOT_FOUND, OK, NO_CONTENT } = HttpStatus;
const { BAD_BODY, WRONG_ID, NOT_FOUND_TRACK } = MESSAGES;

@Controller(TRACK)
export class TrackController {
  constructor(private readonly dbService: DatabaseService) {}
  @Get()
  getTracks() {
    return this.dbService.getAllEntities(TRACKS);
  }

  @Post()
  postTrack(@Body() trackDto: CreateTrackDto, @Res() res: Response) {
    const { name, duration } = trackDto;

    if (!name || !duration) {
      res.status(BAD_REQUEST).send(BAD_BODY);
    } else {
      const savedTrack = this.dbService.pushNewEntity(TRACKS, trackDto);
      res.status(CREATED).send(savedTrack);
    }
  }

  @Get(`:id`)
  getTrackById(@Param() { id }: ParamsId, @Res() res: Response) {
    if (!validate(id)) res.status(BAD_REQUEST).send(WRONG_ID);
    else {
      const findedTrack = this.dbService.getEntityById(TRACKS, id);
      !findedTrack ? res.status(NOT_FOUND).send(NOT_FOUND_TRACK) : res.status(OK).send(findedTrack);
    }
  }

  @Put(`:id`)
  updateTrackById(@Body() trackDto: CreateTrackDto, @Param() { id }: ParamsId, @Res() res: Response) {
    if (!validate(id)) res.status(BAD_REQUEST).send(WRONG_ID);
    else if (checkPropertiesInTrackDto(trackDto)) {
      res.status(BAD_REQUEST).send(BAD_BODY);
    } else {
      const findedIndex = this.dbService.getIndexEntityById(TRACKS, id);
      findedIndex === -1
        ? res.status(NOT_FOUND).send(NOT_FOUND_TRACK)
        : res.status(OK).send(this.dbService.updateEntityByIndex(TRACKS, findedIndex, trackDto));
    }
  }

  @Delete(`:id`)
  deleteTrackById(@Param() { id }: ParamsId, @Res() res: Response) {
    if (!validate(id)) res.status(BAD_REQUEST).send(WRONG_ID);
    else {
      const index = this.dbService.getIndexEntityById(TRACKS, id);
      if (index !== -1) {
        this.dbService.deleteEntityByIndex(TRACKS, index);
        this.dbService.deleteFavoriteEntityById(TRACKS, id);
        res.status(NO_CONTENT).send();
      } else {
        res.status(NOT_FOUND).send(NOT_FOUND_TRACK);
      }
    }
  }
}
