import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTrackDto } from './track.dto';
import { prismaErrorHandling } from 'src/utils/prisma-errors';

@Injectable()
export class TrackService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll() {
    try {
      return await this.prisma.track.findMany();
    } catch (error) {
      prismaErrorHandling(error);
    }
  }

  async createTrack(createTrackDto: CreateTrackDto) {
    try {
      return await this.prisma.track.create({ data: createTrackDto });
    } catch (error) {
      prismaErrorHandling(error);
    }
  }

  async getOne(id: string) {
    try {
      return await this.prisma.track.findUnique({ where: { id } });
    } catch (error) {
      prismaErrorHandling(error);
    }
  }

  async updateTrack(id: string, createTrackDto: CreateTrackDto) {
    try {
      return await this.prisma.track.update({ where: { id }, data: createTrackDto });
    } catch (error) {
      prismaErrorHandling(error);
    }
  }

  async deleteTrack(id: string) {
    try {
      return await this.prisma.track.delete({ where: { id } });
    } catch (error) {
      prismaErrorHandling(error);
    }
  }
}
