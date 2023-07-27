import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AlbumController],
})
export class AlbumModule {}
