import {Observable, of, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

export class ApiError {
  static handleError<T>(error: HttpErrorResponse, operation: string = 'http operation') {
    console.error(`Code: ${error.status}, details: ${error.message}`);
    const errorMessage = 'An error occurred: ' + operation;
    return throwError(() => new Error(errorMessage));
  }
}
