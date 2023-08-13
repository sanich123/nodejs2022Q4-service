import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TrackService } from './track.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [PrismaModule],
  controllers: [TrackController],
  providers: [
    TrackService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class TrackModule {}
