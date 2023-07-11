import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import {
  deleteEntities,
  selectAllEntities,
  selectEntity,
  setEntities,
  upsertEntities,
  withEntities,
} from '@ngneat/elf-entities';
import { joinRequestResult } from '@ngneat/elf-requests';
import { CredentialModel } from 'src/app/domain/login/credential.model';

const storeName = 'login';
type idType = 'email';
const storeId = 'email';
type Entity = CredentialModel;

const entityStore = createStore(
  { name: storeName },
  withEntities<Entity, idType>({ idKey: storeId })
);
@Injectable({ providedIn: 'root' })
export class LoginRepository {
  getStoreName(): string {
    return storeName;
  }

  entities$ = entityStore.pipe(
    selectAllEntities(),
    joinRequestResult([storeName])
  );

  getEntity(id: Entity[idType]) {
    return entityStore.pipe(
      selectEntity(id),
      joinRequestResult([storeName, id])
    );
  }

  addEntities(users: Entity[]) {
    entityStore.update(setEntities(users));
  }

  addEntity(entity: Entity) {
    entityStore.update(upsertEntities(entity));
  }
}
