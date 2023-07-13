import { inject, Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';

import { trackRequestResult } from '@ngneat/elf-requests';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BE_BASE_URL } from 'src/app/conf/be-env';
import { Observable, map } from 'rxjs';
import { HttpUtil } from 'src/app/shared/http-util';
import { ApiError } from 'src/app/shared/api-error';
import { environment } from 'src/environments/environment';
import { CreateAccountRequest } from 'src/app/domain/account/create-account-request';
import { RegisterRepository } from '../../register/repository/register-repository.service';
import { CreateAccountRepository } from '../repository/create-account-repository.service';


type Entity = CreateAccountRequest;
@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {

  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  
  private http: HttpClient = inject(HttpClient);
  private repo: CreateAccountRepository = inject(CreateAccountRepository);
  // requestHeader = new HttpHeaders({ 'No-Auth': 'false' });
  private options: { headers: HttpHeaders } = {headers: HttpUtil.headers()};
  private option: { headers: HttpHeaders } = {headers: HttpUtil.unHeaders()};
  private  URL = BE_BASE_URL + '/api/v1/wallet/auth/';
  //private  URL = BE_BASE_URL + '/api/v1/wallet/auth/';

  createEntity(entity: Entity): Observable<Entity> {

    const url = this.URL + 'create/account';
    return this.http.post<Entity>(url, entity, this.option)
      .pipe(
        tap((entity) => this.repo.addEntity(entity)),
        trackRequestResult([this.repo.getStoreName()]),
        catchError(err => ApiError.handleError<Entity>(err, 'create'))
      );
  }

  getEntity(userId: string): Observable<Entity> {
    const url = this.URL + 'get/wallet/account?userId='+ userId;
    return this.http.get<Entity>(url, this.option)
      .pipe(
        tap((entity) => this.repo.addEntity(entity)),
        trackRequestResult([this.repo.getStoreName(), userId]),
        catchError(err => ApiError.handleError<Entity[]>(err, 'get Entity'))
      );
  }
  
}
