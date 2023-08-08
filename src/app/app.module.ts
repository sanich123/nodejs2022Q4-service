import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { TrackModule } from 'src/track/track.module';
import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';
import { FavsModule } from 'src/favorites/favs.module';
import LoggingService from 'src/logger/logger.middleware';
import { AuthModule } from 'src/auth/auth.module';

@Module({ imports: [UserModule, TrackModule, ArtistModule, AlbumModule, FavsModule, AuthModule] })
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingService).forRoutes('*');
  }
}
