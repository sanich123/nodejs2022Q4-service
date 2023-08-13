import { IsNotEmpty, IsString, IsInt, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  year: number;

  @ValidateIf(({ artistId }) => !Object.is(artistId, null))
  @IsString()
  @IsNotEmpty()
  artistId: string | null;
}

export interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}
