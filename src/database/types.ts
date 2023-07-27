import { Album } from 'src/album/types';
import { Artist } from 'src/artist/types';
import { Track } from 'src/track/types';
import { User } from 'src/user/types';

export type DBType = {
  tracks: Track[];
  albums: Album[];
  users: User[];
  artists: Artist[];
  favorites: {
    tracks: Track[];
    albums: Album[];
    users: User[];
    artists: Artist[];
  };
};
