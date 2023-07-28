import { Injectable } from '@nestjs/common';
import { Favorites } from './types';
import { Album } from 'src/album/album.dto';
import { Track } from 'src/track/track.dto';
import { Artist } from 'src/artist/artist.dto';

@Injectable()
export class FavsService {
  private readonly favs: Favorites = { artists: [], albums: [], tracks: [] };

  getAllFavorites() {
    return this.favs;
  }
  setTrackToFavorites(track: Track) {
    this.favs.tracks.push(track);
  }
  setAlbumToFavorites(album: Album) {
    this.favs.albums.push(album);
  }
  setArtistToFavorites(artist: Artist) {
    this.favs.artists.push(artist);
  }
  getIndexFavoriteTrackById(trackId: string) {
    return this.favs.tracks.findIndex(({ id }) => id === trackId);
  }
  deleteFavoriteTrackByIndex(index: number) {
    return this.favs.tracks.splice(index, 1);
  }
  getIndexFavoriteAlbumById(albumId: string) {
    return this.favs.albums.findIndex(({ id }) => id === albumId);
  }
  deleteFavoriteAlbumByIndex(index: number) {
    return this.favs.albums.splice(index, 1);
  }
  getIndexFavoriteArtistById(artistId: string) {
    return this.favs.artists.findIndex(({ id }) => id === artistId);
  }
  deleteFavoriteArtistByIndex(index: number) {
    return this.favs.artists.splice(index, 1);
  }
}
