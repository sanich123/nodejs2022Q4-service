import { CreateTrackDto } from 'src/track/track.dto';

export function checkPropertiesInTrackDto(trackDto: CreateTrackDto): boolean {
  let falsyValues = false;

  for (const key in trackDto) {
    if (trackDto[key]) {
      const wrongTypeName = key === 'name' && typeof trackDto[key] !== 'string';
      const wrongTypeDuration =
        key === 'duration' && typeof trackDto[key] !== 'number';
      const wrongTypeArtistAlbumId =
        (key === 'albumId' || key === 'artistId') &&
        typeof trackDto[key] !== 'string';
      if (wrongTypeName || wrongTypeDuration || wrongTypeArtistAlbumId) {
        falsyValues = true;
        break;
      }
    } else {
      if (
        (key === 'albumId' || key === 'artistId') &&
        typeof trackDto[key] !== 'object'
      ) {
        falsyValues = true;
        break;
      }
    }
  }
  return falsyValues;
}
