import { inject, Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';

import { trackRequestResult } from '@ngneat/elf-requests';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BE_BASE_URL } from 'src/app/conf/be-env';
import { Observable, map } from 'rxjs';
import { HttpUtil } from 'src/app/shared/http-util';
import { ApiError } from 'src/app/shared/api-error';
import { environment } from 'src/environments/environment';

import { DebitAccountRequest } from 'src/app/domain/account/debit-account-request';
import { DebitAccountRepository } from '../repository/debit-account-repository.service';


type Entity = DebitAccountRequest;
@Injectable({
  providedIn: 'root'
})
export class DebitAccountService {

  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  
  private http: HttpClient = inject(HttpClient);
  private repo: DebitAccountRepository = inject(DebitAccountRepository);
  private options: { headers: HttpHeaders } = {headers: HttpUtil.headers()};
  private option: { headers: HttpHeaders } = {headers: HttpUtil.unHeaders()};
  private  URL = BE_BASE_URL + '/api/wallet/';

  createEntity(entity: Entity): Observable<Entity> {
    const url = this.URL + '/debit/account';
    return this.http.post<Entity>(url, entity, this.option)
      .pipe(
        tap((entity) => this.repo.addEntity(entity)),
        trackRequestResult([this.repo.getStoreName()]),
        catchError(err => ApiError.handleError<Entity>(err, 'create'))
      );
  }
  
}