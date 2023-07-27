import { Injectable } from '@nestjs/common';
import { Album } from 'src/album/types';
import { Artist } from 'src/artist/types';
import { Favorites } from 'src/favorites/types';
import { Track } from 'src/track/types';
import { User } from 'src/user/types';
import { CreateUserDto } from 'src/user/user.dto';
import { v4 } from 'uuid';

@Injectable()
export class DatabaseService {
  tracks: Track[] = [];
  albums: Album[] = [];
  users: User[] = [];
  artists: Artist[] = [];
  favorites: Favorites = {
    tracks: [],
    albums: [],
    artists: [],
  };
  public getAllEntities(place: string) {
    return this[place];
  }
  public pushNewEntity(place: string, entity: any) {
    const modifiedEntity = { id: v4(), ...entity };
    this[place].push(modifiedEntity);
    return modifiedEntity;
  }
  public getEntityById(place: string, entityId: string) {
    return this[place].find(({ id }) => id === entityId);
  }
  public getIndexEntityById(place: string, entityId: string) {
    return this[place].findIndex(({ id }) => id === entityId);
  }
  public updateEntityByIndex(place: string, index: number, entity: any) {
    for (const key in entity) {
      this[place][index][key] = entity[key];
    }
    return this[place][index];
  }
  public deleteEntityByIndex(place: string, index: number) {
    return this[place].splice(index, 1);
  }
  public setNewUser({ login, password }: CreateUserDto) {
    const id = v4();
    const version = 1;
    const createdAt = Date.now();
    const updatedAt = Date.now();
    const userToSave = { login, password, id, version, createdAt, updatedAt };
    this.users.push(userToSave);
    return { id, login, version, createdAt, updatedAt };
  }
  public updatePassword(place: string, index: number, newPassword: string) {
    this[place][index].version += 1;
    this[place][index].password = newPassword;
    this[place][index].updatedAt = Date.now();
    const { login, version, createdAt, updatedAt, id } = this.users[index];
    return { login, version, createdAt, updatedAt, id };
  }
  public deletePropertyById(place: string, id: string, property: string) {
    this[place].map((entity) => {
      if (entity[property] === id) {
        entity[property] = null;
      }
      return entity;
    });
  }
  public pushEntityToFavorites(place: string, entity: any) {
    this.favorites[place].push(entity);
  }
  public getIndexOfFavoriteEntity(place: string, entityId: string) {
    return this.favorites[place].findIndex(({ id }) => entityId === id);
  }
  public deleteFavoriteEntityByIndex(place: string, index: number) {
    return this.favorites[place].splice(index, 1);
  }

  public deleteFavoriteEntityById(place: string, entityId: string) {
    this.favorites[place] = this.favorites[place].filter(({ id }) => id !== entityId);
  }
}
