import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule, PrismaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
