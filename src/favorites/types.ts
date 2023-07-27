import { Album } from 'src/album/types';
import { Artist } from 'src/artist/types';
import { Track } from 'src/track/types';

export interface Favorites {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
