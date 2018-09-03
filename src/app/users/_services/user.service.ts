import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap} from 'rxjs/operators';

// import { ApiService } from '../../shared/api.service';
import { IUser } from '../user';
import { MessageService } from '../../messages/message.service';

import { HttpErrorHandler, HandleError } from '../../http-error.handler.service';
import { environment } from '../../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
   // 'Authorization': 'my-auth-token'import { environment } from '../../environments/environment';
    // 'Authorization', `Bearer ${this.auth.getToken()}`
  })
};



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private  API_URL = environment.apiUrl;
  private handleError: HandleError;

 private userUrl =  `${this.API_URL}/api/users`;

  constructor(  // private messageService: MessageService,clear
     private http: HttpClient,
     private messageService: MessageService,
     httpErrorHandler: HttpErrorHandler) {
      this.handleError = httpErrorHandler.createHandleError('UserService');

     }

  getUsers(): Observable<IUser[]> {
    const url = `${this.userUrl}`;

    return this.http.get<IUser[]>(url).pipe(
      // .map(this.extractData)
  tap(data => console.log('getUsers: ' + JSON.stringify(data))),
      catchError(this.handleError('getUsers', [])));
     // .catch(this.handleError);
  }




  login(credentials): Observable<any> {
   // const headers = new Headers({ 'Content-Type': 'application/json' });
   // const options = new RequestOptions({ headers: headers });

    const url = `${this.userUrl}/login`;
    return this.http.post(url, credentials, httpOptions).pipe(
        //   .map(this.extractData)
     tap(data => console.log('getUser: ' + JSON.stringify(data))),
        catchError(this.handleError<IUser>(`getUser`))
        //   .catch(this.handleError);

    );

  }

  countUsers():  Observable<number> {

    const url = `${this.userUrl}/count`;
    return this.http.get<number>(url).pipe(
  // .map(this.extractData)
 tap(data => this.log('getUser: ' + JSON.stringify(data))),
 catchError(this.handleError<number>(`count`)));

  }
  getUser(id: string): Observable<IUser> {
    if (id === null) {
      return of(this.initializeIUser());
    }
    const url = `${this.userUrl}/${id}`;
    return this.http.get<IUser>(url).pipe(
       // .map(this.extractData)
    tap(data => this.log('getUser: ' + JSON.stringify(data)),
       catchError(this.handleError<IUser>(`getUser id =${id}`)))
    );

  }


  deleteUser( user: IUser| string): Observable<IUser> {
  //  const headers = new Headers({ 'Content-Type': 'application/json' });
 //   const options = new RequestOptions({ headers: headers });
 const id = typeof user === 'string' ? user : user.id;
    const url = `${this.userUrl}/${id}`;
    return this.http.delete<IUser>(url, httpOptions).pipe(
    tap(data => this.log('deleteUser: ' + JSON.stringify(data))),
      catchError(this.handleError<IUser>(`deleteUser`))

    );

  }

  saveBalance(user: IUser): Observable<IUser> {
  //  const headers = new Headers({ 'Content-Type': 'application/json' });
  //  const options = new RequestOptions({ headers: headers });

    if (user.id === null) {
      return this.createUser(user);
    }
    return this.updateUser(user);
  }


  private createUser(user: IUser): Observable<IUser> {
    user.id = undefined;
    const url = `${this.userUrl}/register`;
    return this.http.post<IUser>(url, user, httpOptions).pipe(
       //     .map(this.extractData)
    tap(data => this.log('createUser: ' + JSON.stringify(data))),
       catchError(this.handleError<IUser>('createUser'))
      );

  }


  private updateUser(user: IUser): Observable<IUser> {

    httpOptions.headers =
    httpOptions.headers.set('Authorization', 'my-new-auth-token');
    const url = `${this.userUrl}/${user.id}`;
    return this.http.put<IUser>(url, user, httpOptions).pipe(
      map(() => user),
    tap(data => this.log('updateUser: ' + JSON.stringify(data))),
      catchError(this.handleError('updateUser', user))

    );

  }

/*
  private handleError(error: Response): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json() || 'Server error');
  }*/

  private log(message: string) {
    this.messageService.addMessage(`HeroService: ${message}`);
  }



  initializeIUser(): IUser {
    // Return an initialized object
    return {
      id: null,
      username: null,
      role: null,
      password: null,
      adduser:  null,
      hasitem: null,
      removeItem: null,
      getData:  null
    };
  }
  /*
  private extractData(response: Response) {
    const body = response.json();
    return body.data || {};
  }*/
}
