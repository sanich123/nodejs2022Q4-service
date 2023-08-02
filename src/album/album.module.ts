import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AlbumService } from './album.service';

@Module({
  imports: [DatabaseModule, PrismaModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
