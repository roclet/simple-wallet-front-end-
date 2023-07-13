import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { trackRequestResult } from "@ngneat/elf-requests";
import { Observable, tap, catchError } from "rxjs";
import { BE_BASE_URL } from "src/app/conf/be-env";
import { TransactionHistory } from "src/app/domain/transaction-history/transaction-history-repository.model";
import { ApiError } from "src/app/shared/api-error";
import { HttpUtil } from "src/app/shared/http-util";
import { TransactionHistoryRepository } from "../repository/transaction-history-repository.service";

type Entity = TransactionHistory;

@Injectable({
  providedIn: 'root'
})
export class TransactionHistoryService{
  private http: HttpClient = inject(HttpClient);
  private repo = inject(TransactionHistoryRepository);
  private options: { headers: HttpHeaders } = {headers: HttpUtil.headers()};
  private option: { headers: HttpHeaders } = {headers: HttpUtil.unHeaders()};
  private  URL = BE_BASE_URL + '/api/v1/wallet/auth/';

  getEntity(userId: string): Observable<Entity> {
    const url = this.URL + 'transaction/history?userId='+ userId;
    return this.http.get<Entity>(url, this.option)
      .pipe(
        tap((entity) => this.repo.addEntity(entity)),
        trackRequestResult([this.repo.getStoreName(), userId]),
        catchError(err => ApiError.handleError<Entity[]>(err, 'get Entity'))
      );
  }
  
}
