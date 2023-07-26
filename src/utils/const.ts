export const PATHS = {
  USER: 'user',
  TRACK: 'track',
  ALBUM: 'album',
  ARTIST: 'artist',
};

export const MESSAGES = {
  BAD_BODY: 'Received body does not contain required fields or received fields have wrong types',
  WRONG_ID: 'Your user id is not a valid v4 id',
  NOT_FOUND_USER: 'We could not be able to find user with received id',
  WRONG_PASSWORD: 'Received old password does not equal user password, stored in the database',
  SUCCESS_DELETE: 'We have just successfully deleted your data from the storage',
  EMPTY_FIELDS: 'Old password or new password must not be null empty or undefined',
  NOT_FOUND_TRACK: 'We could not be able to find track with received id',
  NOT_FOUND_ARTIST: 'We could not be able to find artist with received id',
  NOT_FOUND_ALBUM: 'We could not be able to find album with received id',
};
