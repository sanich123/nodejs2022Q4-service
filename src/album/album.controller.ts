import { Body, Controller, Get, Post, Param, Put, Delete, HttpCode } from '@nestjs/common/decorators';
import { MESSAGES, PATHS } from 'src/utils/const';
import { CreateAlbumDto } from './album.dto';
import { HttpStatus } from '@nestjs/common';
import { ParamsId } from 'src/app/params-validation';
import { AlbumService } from './album.service';
import { throwNotFoundException } from 'src/utils/utils';

const { ALBUM } = PATHS;

const { CREATED, NO_CONTENT } = HttpStatus;
const { NOT_FOUND_ALBUM } = MESSAGES;

@Controller(ALBUM)
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAlbums() {
    return await this.albumService.findAll();
  }

  @Post()
  @HttpCode(CREATED)
  async postNewAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Get(':id')
  async getAlbum(@Param() { id }: ParamsId) {
    return (await this.albumService.findOne(id)) ?? throwNotFoundException(NOT_FOUND_ALBUM);
  }

  @Put(':id')
  async updateAlbum(@Body() albumDto: CreateAlbumDto, @Param() { id }: ParamsId) {
    return await this.albumService.updateAlbum(id, albumDto);
  }

  @Delete(':id')
  @HttpCode(NO_CONTENT)
  async deleteAlbum(@Param() { id }: ParamsId) {
    return await this.albumService.deleteAlbum(id);
  }
}
