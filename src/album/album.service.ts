import { Injectable } from '@nestjs/common';
import { Album } from './types';
import { CreateAlbumDto } from './album.dto';
import { v4 } from 'uuid';

@Injectable()
export class AlbumService {
  private readonly albums: Album[] = [];

  getAllAlbums() {
    return this.albums;
  }
  setNewAlbum({ name, year, artistId }: CreateAlbumDto) {
    const modifiedAlbum = { id: v4(), name, year, artistId: artistId ? artistId : null };
    this.albums.push(modifiedAlbum);
    return modifiedAlbum;
  }
  getAlbumById(albumId: string) {
    return this.albums.find(({ id }) => id === albumId);
  }
  getAlbumIndexById(albumId: string) {
    return this.albums.findIndex(({ id }) => id === albumId);
  }
  updateAlbumByIndex(index: number, albumDto: CreateAlbumDto) {
    for (const key in albumDto) {
      this.albums[index][key] = albumDto[key];
    }
    return this.albums[index];
  }

  deleteAlbumById(index: number) {
    return this.albums.splice(index, 1);
  }
  updateArtistIdAfterDeletingArtist(id: string) {
    return this.albums.map((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
      return album;
    });
  }
}
