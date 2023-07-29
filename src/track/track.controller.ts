import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { MESSAGES, PATHS, PLACES } from 'src/utils/const';
import { CreateTrackDto } from './track.dto';
import { Response } from 'express';
import { DatabaseService } from 'src/database/database.service';
import { ParamsId } from 'src/app/params-validation';

const { TRACK } = PATHS;
const { TRACKS } = PLACES;
const { CREATED, NOT_FOUND, OK, NO_CONTENT } = HttpStatus;
const { NOT_FOUND_TRACK } = MESSAGES;

@Controller(TRACK)
export class TrackController {
  constructor(private readonly dbService: DatabaseService) {}
  @Get()
  getTracks() {
    return this.dbService.getAllEntities(TRACKS);
  }

  @Post()
  @HttpCode(CREATED)
  postTrack(@Body() trackDto: CreateTrackDto) {
    return this.dbService.pushNewEntity(TRACKS, trackDto);
  }

  @Get(':id')
  getTrackById(@Param() { id }: ParamsId, @Res() res: Response) {
    const findedTrack = this.dbService.getEntityById(TRACKS, id);
    !findedTrack ? res.status(NOT_FOUND).send(NOT_FOUND_TRACK) : res.status(OK).send(findedTrack);
  }

  @Put(':id')
  updateTrackById(@Body() trackDto: CreateTrackDto, @Param() { id }: ParamsId, @Res() res: Response) {
    const findedIndex = this.dbService.getIndexEntityById(TRACKS, id);
    findedIndex === -1
      ? res.status(NOT_FOUND).send(NOT_FOUND_TRACK)
      : res.status(OK).send(this.dbService.updateEntityByIndex(TRACKS, findedIndex, trackDto));
  }

  @Delete(':id')
  deleteTrackById(@Param() { id }: ParamsId, @Res() res: Response) {
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
