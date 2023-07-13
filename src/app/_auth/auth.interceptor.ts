import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  constructor(
     private router: Router
  ) {
  
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(this.authLocalStorageToken)!;
    if (req.headers.get('No-Auth') === 'True') {
      console.log("xsssssss", token);
      return next.handle(req.clone());
    }
   
     // const token = this.userAuthService.getToken();
    req = this.addToken(req, token);
    return next.handle(req).pipe(
      tap((res: any) => {
        return res;
      }),
      catchError(this.handleError)
    );
   }

  private addToken(request: HttpRequest<any>, token: string) {
    console.log("pppppppppppp", token);
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handleError(error: any) {
    if (error instanceof ErrorEvent) {
      console.error('Client side network error occurred:', error.error.message);
    } else {
      console.error(
        'Backend - ' +
          `status: ${error.status}, ` +
          `statusText: ${error.statusText}, ` +
          `message: ${error.error.message}`
      );
    }

    return throwError(() => error || 'server error');
  }

}
