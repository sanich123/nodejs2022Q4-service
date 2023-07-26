import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { TrackModule } from 'src/track/track.module';
import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';

@Module({
  imports: [UserModule, TrackModule, ArtistModule, AlbumModule],
})
export class AppModule {}
