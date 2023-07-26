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
}
