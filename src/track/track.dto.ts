import { IsNotEmpty, IsString, IsInt, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @ValidateIf(({ artistId }) => !Object.is(artistId, null))
  @IsString()
  @IsNotEmpty()
  artistId: string | null;

  @ValidateIf(({ albumId }) => !Object.is(albumId, null))
  @IsString()
  @IsNotEmpty()
  albumId: string | null;

  @IsInt()
  duration: number;
}

export interface Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}
