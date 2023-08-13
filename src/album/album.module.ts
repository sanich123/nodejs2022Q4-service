import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AlbumService } from './album.service';

@Module({
  imports: [PrismaModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
