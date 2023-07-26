import { Injectable } from '@nestjs/common';
import { Artist } from './types';
import { CreateArtistDto } from './artist.dto';
import { v4 } from 'uuid';

@Injectable()
export class ArtistService {
  private readonly artists: Artist[] = [];
  getAllArtists() {
    return this.artists;
  }
  saveArtist({ name, grammy }: CreateArtistDto) {
    const modifiedArtist = { id: v4(), name, grammy };
    this.artists.push(modifiedArtist);
    return modifiedArtist;
  }
  getArtistById(artistId: string) {
    return this.artists.find(({ id }) => id === artistId);
  }

  getArtistIndexById(artistId: string) {
    return this.artists.findIndex(({ id }) => id === artistId);
  }
  updateArtistByIndex(index: number, artistDto: CreateArtistDto) {
    for (const key in artistDto) {
      this.getAllArtists()[index][key] = artistDto[key];
    }
    return this.getAllArtists()[index];
  }
  deleteArtistById(index: number) {
    return this.getAllArtists().splice(index, 1);
  }
}
