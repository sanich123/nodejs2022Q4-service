import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTrackDto } from './track.dto';
import { MESSAGES } from 'src/utils/const';

@Injectable()
export class TrackService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll() {
    return await this.prisma.track.findMany();
  }

  public async createTrack(createTrackDto: CreateTrackDto) {
    return await this.prisma.track.create({ data: createTrackDto });
  }

  public async getOne(id: string) {
    return await this.prisma.track.findUnique({ where: { id } });
  }

  public async updateTrack(id: string, createTrackDto: CreateTrackDto) {
    try {
      return await this.prisma.track.update({ where: { id }, data: createTrackDto });
    } catch (error) {
      throw new NotFoundException(MESSAGES.NOT_FOUND_TRACK);
    }
  }

  public async deleteTrack(id: string) {
    try {
      return await this.prisma.track.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(MESSAGES.NOT_FOUND_TRACK);
    }
  }
}
