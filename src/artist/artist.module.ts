import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ArtistController],
})
export class ArtistModule {}
