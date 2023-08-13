import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TrackService } from './track.service';

@Module({
  imports: [PrismaModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
