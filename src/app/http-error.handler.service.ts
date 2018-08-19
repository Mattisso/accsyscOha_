import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS , HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { MessageService } from './messages/message.service';
import { AuthService } from './users/_services/auth.service';

/** Type of the handleError function returned by HttpErrorHandler.createHandleError */
export type HandleError =
  <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;

/** Handles HttpClient errors */
@Injectable()
export class HttpErrorHandler {
  constructor(private messageService: MessageService,
 // private authservice:  AuthService
) { }

  /** Create curried handleError function that already knows the service name */
  createHandleError = (serviceName = '') => <T>
    (operation = 'operation', result = {} as T) => this.handleError(serviceName, operation, result)

  handleError<T> (serviceName = '', operation = 'operation', result = {} as T) {

    return (error: HttpErrorResponse): Observable<T> => {

      const message = (error.error instanceof ErrorEvent) ?
      error.error.message :
     `server returned code ${error.status} with body "${JSON.stringify(error.error)}"`;

      // TODO: send the error to remote logging infrastructure

      this.messageService.error(`${serviceName}: ${operation} failed: ${message}`);
      console.error(message); // log to console instead
/*
      const message = (error.error instanceof ErrorEvent) ?
        error.error.message :
       `server returned code ${error.status} with body "${error.error}"`;*/

      // TODO: better job of transforming error for user consumption
      this.messageService.addMessage(`${serviceName}: ${operation} failed: ${message}`);

      // Let the app keep running by returning a safe result.
      return of( result );
    };

  }
/*
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // extract error message from http body if an error occurs
    return next.handle(request).pipe(
        catchError(errorResponse => {
          if (errorResponse === 401) {
       //  this.authservice.logout();
            location.reload(true);
          }

          const error = errorResponse.error.message || errorResponse.statusText;
            return  throwError(error );
        })

    );
  }*/
}
