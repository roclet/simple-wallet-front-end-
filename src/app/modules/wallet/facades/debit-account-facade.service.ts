import {inject, Injectable} from '@angular/core';

import { CreateAccountRepository } from '../repository/create-account-repository.service';
import { CreditAccountService } from '../service/credit-account.service';
import { DebitAccountRequest } from 'src/app/domain/account/debit-account-request';
import { DebitAccountService } from '../service/debit-account.service';

type Entity = DebitAccountRequest;
@Injectable({
  providedIn: 'root'
})
export class  DebitAccountFacadeService {
  
  private  readonly service = inject(DebitAccountService);

  entities$ = inject(CreateAccountRepository).entities$;

  createEntity(entity: Entity) {
    this.service.createEntity(entity).subscribe()
     return this.entities$;
   }

}