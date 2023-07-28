import { Album } from 'src/album/album.dto';
import { Artist } from 'src/artist/artist.dto';
import { Track } from 'src/track/track.dto';

export interface Favorites {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
