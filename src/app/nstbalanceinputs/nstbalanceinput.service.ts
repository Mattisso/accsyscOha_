import { Injectable, Inject, Optional} from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { catchError, tap, map } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error.handler.service';
import { environment } from '../../environments/environment';

import { INstbalanceinput } from './nstbalanceinput';
// import { ApiService } from '../../shared/http.service';
 import { MessageService } from '../messages/message.service';
 import { AuthService } from '../users/_services/auth.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
    // 'Authorization', `Bearer ${this.auth.getToken()}`
  })

};


@Injectable({
  providedIn: 'root'
})
export class NstbalanceinputService {

  private  API_URL = environment.apiUrl;
  private balanceinput_Url = `${this.API_URL}/api/nstbalanceinputs`; // environment.balanceinput_Url;

  private handleError: HandleError;
  balances: INstbalanceinput[] = [];

  constructor(private http: HttpClient,
     private messageService: MessageService,
    httpErrorHandler: HttpErrorHandler,
   private auth:  AuthService,
   @Optional() @Inject(APP_BASE_HREF) origin: string) {
    this.handleError = httpErrorHandler.createHandleError('NstbalanceinputService');
    this.balanceinput_Url = `${origin}${this.balanceinput_Url}`;
  }

  getBalances(): Observable<INstbalanceinput[]> {
     const url = `${this.balanceinput_Url}`;
    return this.http.get<INstbalanceinput[]>(url, {responseType: 'json'}).pipe(
 //     of(new HttpResponse({status:200, body:body})),
 // map(this.extractData),
      tap(data => `getBalances:   ${JSON.stringify(data)}`),
      catchError(this.handleError('getBalances', [])));
    //  .catch(this.handleError);
  }

  getHeroNo404<Data>(id: string): Observable<INstbalanceinput> {
    const url = `${this.balanceinput_Url}/?id=${id}`;
    return this.http.get<INstbalanceinput[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          //     this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<INstbalanceinput>(`getHero id =${id}`))
      );
  }

  getBalance(id: string): Observable<INstbalanceinput | undefined> {

    return this.getBalances().pipe(

      map((balances: INstbalanceinput[]) => balances.find(p => p.id === id))
     //  tap(data => this.log('getBalance: ' + JSON.stringify(data))),
    //  catchError(this.handleError<INstbalanceinput>(`getBalance id =${id}`))
      // .catch(this.handleError);

    );

  }

  /* GET heroes whose name contains search term */
  searchBalanceinputs(term: string): Observable<INstbalanceinput[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<INstbalanceinput[]>(`${this.balanceinput_Url}/?IntitulCompte=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<INstbalanceinput[]>('searchHeroes', []))
    );
  }


  deleteBalance(balance: INstbalanceinput | string): Observable<INstbalanceinput> {
     const headers = new HttpHeaders();
     headers.append('Content-Type', 'application/json');
    //  headers.append('Authorization', `Bearer ${this.auth.
// const options = new RequestOptions({ headers: headers });
    const id = typeof balance === 'string' ? balance : balance.id;

    const url = `${this.balanceinput_Url}/${id}`;
    return this.http.delete<INstbalanceinput>(url, {headers: headers}).pipe(
       tap(_ => this.log(`deleted BalanceInput id:  ${id}`)),
      catchError(this.handleError<INstbalanceinput>(`deleteBalance`))

    );

  }


  saveBalance(balance: INstbalanceinput): Observable<INstbalanceinput> {
    //   const headers = new Headers({ 'Content-Type': 'application/json' });
    //   const options = new RequestOptions({ headers: headers });

    if (balance.id === null) {
      return this.createBalance(balance);
    }
    return this.updateBalance(balance);
  }

  private createBalance(balance: INstbalanceinput): Observable<INstbalanceinput> {
    const url = `${this.balanceinput_Url}`;
    balance.id = undefined;
    return this.http.post<INstbalanceinput>(url, balance, httpOptions).pipe(
      // .map(this.extractData)
      tap((data: INstbalanceinput) => this.log(`createBalanceinput w id=/: ${data.id}`)),
      catchError(this.handleError<INstbalanceinput>('createbalance'))
      //  .catch(this.handleError);

    );

  }

  private updateBalance(balance: INstbalanceinput): Observable<any> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
    const url = `${this.balanceinput_Url}/${balance.id}`;
    return this.http.put<INstbalanceinput>(url, balance, httpOptions).pipe(
      //   map(() => balance),
       tap(_ => this.log(`updated Balanceinput id: ${balance.id}`)),
      catchError(this.handleError('updateBalanceInput', balance))

    );

  }

  /*
    private handleError(error: Response): Observable<any> {
      // in a real world app, we may send the server to some remote logging infrastructure
      // instead of just logging it to the console
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
    }
    */
  /*
   private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

     return of(result as T);
    };
  }

    /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.addMessage(`NstbalanceinputService: ${message}`);
  }

  initializeINstbalanceinput(): INstbalanceinput {
    // Return an initialized object
    return {
      id: null,
      NumCompte: null,
      IntitulCompte: null,
      SoldeDebit: null,
      SoldeCredit: null,
      addbalanceinput: null,
      hasitem: null,
      removeItem: null,
      getData: null,
      CreatedOn: null,
      CreatedBy: null,
      ModifiedOn: null,
      ModifiedBy: null
    };
  }

    private extractData(response: HttpResponse<INstbalanceinput>) {
      const body = response.body;
      return { observe: response }  || {};
    }
}
