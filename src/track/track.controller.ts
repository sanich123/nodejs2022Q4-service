import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { MESSAGES, PATHS } from 'src/utils/const';
import { CreateTrackDto } from './track.dto';
import { Response } from 'express';
import { ParamsId } from 'src/user/types';
import { validate } from 'uuid';
import { checkPropertiesInTrackDto } from 'src/utils/utils';

const { TRACK } = PATHS;
const { BAD_REQUEST, CREATED, NOT_FOUND, OK, NO_CONTENT } = HttpStatus;
const { BAD_BODY, WRONG_ID, NOT_FOUND_TRACK } = MESSAGES;

@Controller()
export class TrackController {
  constructor(private readonly trackService: TrackService) {}
  @Get(TRACK)
  getTracks() {
    return this.trackService.getAllTracks();
  }

  @Post(TRACK)
  postTrack(@Body() trackDto: CreateTrackDto, @Res() res: Response) {
    const { name, duration } = trackDto;
    if (!name || !duration) {
      res.status(BAD_REQUEST).send(BAD_BODY);
    } else {
      const savedTrack = this.trackService.saveTrack(trackDto);
      res.status(CREATED).send(savedTrack);
    }
  }

  @Get(`${TRACK}/:id`)
  getTrackById(@Param() { id }: ParamsId, @Res() res: Response) {
    if (!validate(id)) res.status(BAD_REQUEST).send(WRONG_ID);
    else {
      const findedTrack = this.trackService.getTrackById(id);
      !findedTrack
        ? res.status(NOT_FOUND).send(NOT_FOUND_TRACK)
        : res.status(OK).send(findedTrack);
    }
  }

  @Put(`${TRACK}/:id`)
  updateTrackById(
    @Body() trackDto: CreateTrackDto,
    @Param() { id }: ParamsId,
    @Res() res: Response,
  ) {
    if (!validate(id)) res.status(BAD_REQUEST).send(WRONG_ID);
    else if (checkPropertiesInTrackDto(trackDto)) {
      res.status(BAD_REQUEST).send(BAD_BODY);
    } else {
      const findedIndex = this.trackService.getTrackIndexById(id);
      findedIndex === -1
        ? res.status(NOT_FOUND).send(NOT_FOUND_TRACK)
        : res
            .status(OK)
            .send(this.trackService.updateTrack(trackDto, findedIndex));
    }
  }

  @Delete(`${TRACK}/:id`)
  deleteTrackById(@Param() { id }: ParamsId, @Res() res: Response) {
    if (!validate(id)) res.status(BAD_REQUEST).send(WRONG_ID);
    else {
      const index = this.trackService.getTrackIndexById(id);
      if (index !== -1) {
        this.trackService.deleteTrack(index);
        res.status(NO_CONTENT).send();
      } else {
        res.status(NOT_FOUND).send(NOT_FOUND_TRACK);
      }
    }
  }
}
