import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AlbumService } from './album.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [PrismaModule],
  controllers: [AlbumController],
  providers: [
    AlbumService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AlbumModule {}
