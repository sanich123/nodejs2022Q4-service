import { MESSAGES, PATHS } from 'src/utils/const';
import { CreateArtistDto } from './artist.dto';
import { Body, Controller, Get, Post, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ParamsId } from 'src/app/params-validation';
import { ArtistService } from './artist.service';
import { throwNotFoundException } from 'src/utils/utils';

const { ARTIST } = PATHS;
const { CREATED, NO_CONTENT } = HttpStatus;
const { NOT_FOUND_ARTIST } = MESSAGES;

@Controller(ARTIST)
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async getArtists() {
    return await this.artistService.findAll();
  }

  @Post()
  @HttpCode(CREATED)
  async createArtist(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistService.createArtist(createArtistDto);
  }

  @Get(':id')
  async getArtistById(@Param() { id }: ParamsId) {
    return (await this.artistService.findOne(id)) ?? throwNotFoundException(NOT_FOUND_ARTIST);
  }

  @Put(':id')
  async updateArtistByIndex(@Body() artistDto: CreateArtistDto, @Param() { id }: ParamsId) {
    return await this.artistService.updateArtist(id, artistDto);
  }

  @Delete(':id')
  @HttpCode(NO_CONTENT)
  async deleteArtistById(@Param() { id }: ParamsId) {
    const findedArtist = await this.artistService.deleteArtist(id);
    if (!findedArtist) throwNotFoundException(NOT_FOUND_ARTIST);
  }
}
