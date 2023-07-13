import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';

import { Observable, EMPTY, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(public router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        let handled: boolean = false;
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error('Error Event');
          } else {
            switch (error.status) {
              case 401: //login
                this.router.navigateByUrl('/login');
                handled = true;
                break;
              case 403: //forbidden
                this.router.navigateByUrl('/login');
                handled = true;
                break;
            }
          }
        } else {
          console.error('Other Errors');
        }

        if (handled) {
            return of(error);
        } else {
            return throwError(error);
        }
      })
    );
  }
}

