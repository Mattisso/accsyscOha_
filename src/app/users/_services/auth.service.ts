import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {map, delay, tap, catchError} from 'rxjs/operators';
import { IUser } from '../user';
import { MessageService } from '../../messages/message.service';
import { UserService} from './user.service';
import { Observable, of } from 'rxjs';
import { HttpErrorHandler, HandleError } from '../../http-error.handler.service';
import { environment } from '../../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';

 // const jwtHelper =  new JwtHelperService();

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
   // 'Authorization': 'my-auth-token'
    // 'Authorization', `Bearer ${this.auth.getToken()}`
  }),
  response: 'json'
};
const API_URL = environment.apiUrl;

@Injectable()
export class AuthService {
  currentUser: IUser = this.initializeIUser();
  redirectUrl: string;
  isLoggedIn = false;
  isAdmin = false;
  private baseUrl = 'users';
    private handleError: HandleError;

  constructor(private messageService: MessageService,
    private route: ActivatedRoute,  private router: Router,
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private jwtHelper: JwtHelperService

) {
  this.handleError = httpErrorHandler.createHandleError('UserService');
  const token = localStorage.getItem('token');
  if (token) {
    const decodedUser = this.decodeUserFromToken(token);
    this.setCurrentUser(decodedUser);
  }
      }

      getAuthorizationToken() {
        return 'some-auth-token';
      }


      login(username: string, password: string): Observable<any>  {
        const url = `${this.baseUrl}/login`;
        return this.http.post<any>(url, { username: username, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes

               //     localStorage.setItem('token', user.token);
                 localStorage.setItem('currentUser', JSON.stringify(user));
             /*   const decodedUser = this.decodeUserFromToken(user.token);
               this.setCurrentUser(decodedUser); */
                }

                return this.isLoggedIn;

            }),
            catchError(this.handleError<IUser>(`currentUser`))
          );
    }


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }


    decodeUserFromToken(token) {
      return this.jwtHelper.decodeToken(token).user;
    }

    setCurrentUser(decodedUser) {
      this.isLoggedIn = true;
      this.currentUser.id = decodedUser._id;
      this.currentUser.username = decodedUser.username;
      this.currentUser.role = decodedUser.role;
      decodedUser.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;
      delete decodedUser.role;
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

}

