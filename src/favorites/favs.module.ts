import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FavsService } from './favs.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [PrismaModule],
  controllers: [FavsController],
  providers: [
    FavsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class FavsModule {}
