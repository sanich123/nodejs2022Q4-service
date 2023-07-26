import { Injectable } from '@nestjs/common';
import { Track } from './types';
import { CreateTrackDto } from './track.dto';
import { v4 } from 'uuid';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];

  getAllTracks() {
    return this.tracks;
  }
  saveTrack(trackDto: CreateTrackDto) {
    const { name, duration, albumId, artistId } = trackDto;
    const modifiedTrack = {
      id: v4(),
      name,
      duration,
      albumId: albumId ? albumId : null,
      artistId: artistId ? artistId : null,
    };

    this.tracks.push(modifiedTrack);
    return modifiedTrack;
  }

  updateTrack(trackDto: CreateTrackDto, index: number) {
    for (const key in trackDto) {
      if (trackDto[key]) {
        this.getAllTracks()[index][key] = trackDto[key];
      }
    }
    return this.getAllTracks()[index];
  }

  getTrackById(trackId: string) {
    return this.tracks.find(({ id }) => id === trackId);
  }

  getTrackIndexById(trackId: string) {
    return this.tracks.findIndex(({ id }) => id === trackId);
  }
  deleteTrack(index: number) {
    return this.tracks.splice(index, 1);
  }
  updateArtistIdAfterDeletingArtist(id: string) {
    return this.tracks.map((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
      return track;
    });
  }
  updateAlbumIdAfterDeletingAlbum(id: string) {
    return this.tracks.map((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
      return track;
    });
  }
}
