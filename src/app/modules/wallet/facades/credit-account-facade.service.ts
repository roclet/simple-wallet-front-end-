import {inject, Injectable} from '@angular/core';

import { CreateAccountRepository } from '../repository/create-account-repository.service';
import { CreditAccountRequest } from 'src/app/domain/account/credit-account-request';
import { CreditAccountService } from '../service/credit-account.service';

type Entity = CreditAccountRequest;
@Injectable({
  providedIn: 'root'
})
export class  CreditAccountFacadeService {
  
  private  readonly service = inject(CreditAccountService);
  private  readonly repository = inject(CreateAccountRepository);

  entities$ = inject(CreateAccountRepository).entities$;

  createEntity(entity: Entity) {
    this.service.createEntity(entity).subscribe()
     return this.entities$;
   }

}
