import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}

export interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}
