import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { BE_BASE_URL } from 'src/app/conf/be-env';
import { HttpUtil } from 'src/app/shared/http-util';
import { environment } from 'src/environments/environment';
import { RegisterRepository } from '../repository/register-repository.service';
import { trackRequestResult } from '@ngneat/elf-requests';
import { Observable, tap, catchError } from 'rxjs';
import { ApiError } from 'src/app/shared/api-error';
import { UserModel } from 'src/app/domain/register/user.model';
type Entity = UserModel;

@Injectable({
  providedIn: 'root'
})
export class RegsiterService {

  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  
  private http: HttpClient = inject(HttpClient);
  private repo: RegisterRepository = inject(RegisterRepository);
  private options: { headers: HttpHeaders } = {headers: HttpUtil.headers()};
  private option: { headers: HttpHeaders } = {headers: HttpUtil.unHeaders()};
  private  URL = BE_BASE_URL + '/api/v1/wallet/auth/';

  createEntity(entity: Entity): Observable<Entity> {
    const url = this.URL + 'register';
    return this.http.post<Entity>(url, entity, this.option)
      .pipe(
        tap((entity) => this.repo.addEntity(entity)),
        trackRequestResult([this.repo.getStoreName()]),
        catchError(err => ApiError.handleError<Entity>(err, 'create'))
      );
  }
}
