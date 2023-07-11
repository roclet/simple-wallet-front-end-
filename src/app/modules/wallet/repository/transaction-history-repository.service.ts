import {Injectable} from "@angular/core";
import {
  deleteEntities,
  selectAllEntities,
  selectEntity,
  setEntities,
  upsertEntities,
  withEntities,
} from '@ngneat/elf-entities';
import {joinRequestResult} from '@ngneat/elf-requests';
import {createStore} from "@ngneat/elf";
import { TransactionHistory } from "src/app/domain/transaction-history/transaction-history-repository.model";


const storeName = 'forestry-indicators';
type  idType = 'userId';
const  storeId = 'userId';
type Entity = TransactionHistory;

const entityStore = createStore(
  { name: storeName },
  withEntities<Entity,idType>({ idKey: storeId }),
);

@Injectable({providedIn: 'root'})
export class TransactionHistoryRepository {
  getStoreName():string {
    return storeName;
  }

  entities$ = entityStore.pipe(selectAllEntities(), joinRequestResult([storeName]));

  getEntity(id: Entity[idType]) {
    return entityStore.pipe(selectEntity(id), joinRequestResult([storeName, id]));
  }

  addEntities(users: Entity[]) {
    entityStore.update(
      setEntities(users)
    );
  }

  addEntity(entity: Entity) {
    entityStore.update(upsertEntities(entity));
  }

  deleteEntity(id: Entity[idType]) {
    entityStore.update(deleteEntities(id));
  }
}
