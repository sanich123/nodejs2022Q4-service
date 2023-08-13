import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { MESSAGES, PATHS } from 'src/utils/const';
import { CreateTrackDto } from './track.dto';
import { ParamsId } from 'src/app/params-validation';
import { TrackService } from './track.service';
import { throwNotFoundException } from 'src/utils/utils';

const { TRACK } = PATHS;
const { CREATED, NO_CONTENT } = HttpStatus;
const { NOT_FOUND_TRACK } = MESSAGES;

@Controller(TRACK)
export class TrackController {
  constructor(private readonly trackService: TrackService) {}
  @Get()
  getTracks() {
    return this.trackService.findAll();
  }

  @Post()
  @HttpCode(CREATED)
  async postTrack(@Body() trackDto: CreateTrackDto) {
    return await this.trackService.createTrack(trackDto);
  }

  @Get(':id')
  async getTrackById(@Param() { id }: ParamsId) {
    return (await this.trackService.getOne(id)) ?? throwNotFoundException(NOT_FOUND_TRACK);
  }

  @Put(':id')
  async updateTrackById(@Body() trackDto: CreateTrackDto, @Param() { id }: ParamsId) {
    return this.trackService.updateTrack(id, trackDto);
  }

  @Delete(':id')
  @HttpCode(NO_CONTENT)
  async deleteTrackById(@Param() { id }: ParamsId) {
    const findedTrack = await this.trackService.deleteTrack(id);
    if (!findedTrack) throwNotFoundException(NOT_FOUND_TRACK);
  }
}
