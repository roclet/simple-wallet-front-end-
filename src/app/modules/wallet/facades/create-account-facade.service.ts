import {inject, Injectable} from '@angular/core';

import { CreateAccountRepository } from '../repository/create-account-repository.service';
import { CreateAccountService } from '../service/create-account.service';
import { CreateAccountRequest } from 'src/app/domain/account/create-account-request';

type Entity = CreateAccountRequest;
@Injectable({
  providedIn: 'root'
})
export class CreateAccountFacadeService {
  
  private  readonly service = inject(CreateAccountService);
  private  readonly repository = inject(CreateAccountRepository);

  entities$ = inject(CreateAccountRepository).entities$;

  createEntity(entity: Entity) {
    this.service.createEntity(entity).subscribe()
     return this.entities$;
   }

}
