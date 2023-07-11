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
import { DebitAccountRequest } from 'src/app/domain/account/debit-account-request';

const storeName = 'debit-account';
type idType = 'userId';
const storeId = 'userId';
type Entity = DebitAccountRequest;

const entityStore = createStore(
  { name: storeName },
  withEntities<Entity, idType>({ idKey: storeId })
);
@Injectable({ providedIn: 'root' })
export class DebitAccountRepository {
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
