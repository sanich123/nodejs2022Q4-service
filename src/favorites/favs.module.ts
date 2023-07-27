import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FavsController],
})
export class FavsModule {}
