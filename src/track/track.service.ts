import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTrackDto } from './track.dto';

@Injectable()
export class TrackService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.track.findMany();
  }

  async createTrack(createTrackDto: CreateTrackDto) {
    return this.prisma.track.create({ data: createTrackDto });
  }

  async getOne(id: string) {
    return this.prisma.track.findUnique({ where: { id } });
  }

  async updateTrack(id: string, createTrackDto: CreateTrackDto) {
    return this.prisma.track.update({ where: { id }, data: createTrackDto });
  }

  async deleteTrack(id: string) {
    return this.prisma.track.delete({ where: { id } });
  }
}
