import { Injectable,inject } from '@angular/core';
import { TransactionHistoryService } from '../service/transaction-history.service';
import { TransactionHistoryRepository } from '../repository/transaction-history-repository.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionHistoryFacadeService {

  private  readonly service = inject(TransactionHistoryService);
  private  readonly repository = inject(TransactionHistoryRepository);

  entities$ = inject(TransactionHistoryRepository).entities$;

 
 getEntity(name: string) {
    this.service.getEntity(name).subscribe();
    return this.repository.getEntity(name);
  }

//   getEntities() {
//     this.service.getEntities().subscribe();
//     return this.entities$;
//   }
}