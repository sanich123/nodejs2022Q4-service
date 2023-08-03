import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FavsService } from './favs.service';

@Module({
  imports: [DatabaseModule, PrismaModule],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
