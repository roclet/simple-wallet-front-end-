import {inject, Injectable} from '@angular/core';
import { CredentialModel } from 'src/app/domain/login/credential.model';
import { LoginService } from '../service/login.service';
import { LoginRepository } from '../repository/login-repository.service';

type Entity = CredentialModel;
@Injectable({
  providedIn: 'root'
})
export class LoginFacadeService {
  
  private  readonly service = inject(LoginService);
  private  readonly repository = inject(LoginRepository);

  entities$ = inject(LoginRepository).entities$;

  createEntity(entity: Entity) {
    this.service.createEntity(entity).subscribe()
     return this.entities$;
   }

}
