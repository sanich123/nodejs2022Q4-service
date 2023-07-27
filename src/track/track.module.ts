import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TrackController],
})
export class TrackModule {}
