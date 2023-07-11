import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { trackRequestResult } from '@ngneat/elf-requests';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CredentialModel } from 'src/app/domain/login/credential.model';
import { BE_BASE_URL } from 'src/app/conf/be-env';
import { LoginRepository } from '../repository/login-repository.service';
import { HttpUtil } from 'src/app/shared/http-util';
import { ApiError } from 'src/app/shared/api-error';
import { environment } from 'src/environments/environment';


type Entity = CredentialModel;
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  
  private http: HttpClient = inject(HttpClient);
  private repo: LoginRepository = inject(LoginRepository);
  private options: { headers: HttpHeaders } = {headers: HttpUtil.headers()};
  private option: { headers: HttpHeaders } = {headers: HttpUtil.unHeaders()};
  private  URL = BE_BASE_URL + '/api/v1/wallet/auth/';

  createEntity(entity: Entity): Observable<Entity> {
    const url = this.URL + 'authenticate';
    return this.http.post<Entity>(url, entity, this.option)
      .pipe(
        tap((entity) => this.repo.addEntity(entity)),
        trackRequestResult([this.repo.getStoreName()]),
        catchError(err => ApiError.handleError<Entity>(err, 'create'))
      );
  }
  
}
