import {inject, Injectable} from '@angular/core';
import { RegsiterService } from '../service/regsiter.service';
import { RegisterRepository } from '../repository/register-repository.service';
import { UserModel } from 'src/app/domain/register/user.model';

type Entity = UserModel;
@Injectable({
  providedIn: 'root'
})
export class RegisterFacadeService {
  
  private  readonly service = inject(RegsiterService);
  private  readonly repository = inject(RegisterRepository);

  entities$ = inject(RegisterRepository).entities$;

  createEntity(entity: Entity) {
    this.service.createEntity(entity).subscribe()
     return this.entities$;
   }

}
