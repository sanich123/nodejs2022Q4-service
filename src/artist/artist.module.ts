import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [PrismaModule],
  controllers: [ArtistController],
  providers: [
    ArtistService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class ArtistModule {}
