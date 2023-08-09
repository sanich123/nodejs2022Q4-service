import { HttpStatus } from '@nestjs/common';

export const PATHS = {
  USER: 'user',
  TRACK: 'track',
  ALBUM: 'album',
  ARTIST: 'artist',
  FAVORITES: 'favs',
  LOGIN: 'login',
  SIGNUP: 'signup',
  AUTH: 'auth',
};

export const MESSAGES = {
  NOT_FOUND_USER: 'We could not be able to find user with received id',
  WRONG_PASSWORD: 'Received old password does not equal user password, stored in the database',
  NOT_FOUND_TRACK: 'We could not be able to find track with received id',
  NOT_FOUND_ARTIST: 'We could not be able to find artist with received id',
  NOT_FOUND_ALBUM: 'We could not be able to find album with received id',
  NON_EXISTING_LOGIN: 'This login does not exist in database',
  DIDNT_MATCH_PASSWORDS: 'Password in the database does not equals received passwrod',
  ALREADY_EXIST_LOGIN: 'This login is already in a database',
};

export const MAP_ERRORS = {
  P2000: HttpStatus.BAD_REQUEST,
  P2002: HttpStatus.CONFLICT,
  P2025: HttpStatus.NOT_FOUND,
};
