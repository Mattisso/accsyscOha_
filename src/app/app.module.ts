import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule , HttpClientXsrfModule } from '@angular/common/http';
import { Router } from '@angular/router';
import {HttpModule} from '@angular/http';
 import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BalanceData } from './mock-data/nstbalanceinputdata';
import { RequestCache, RequestCacheWithMap } from './request-cache.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

// used to create fake backend
import { fakeBackendProvider } from './_helper/fake-backend';


// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule, } from './app-routing.module';
  import { AuthService } from './users/_services/auth.service';
  import { HttpErrorHandler } from './http-error.handler.service';
 // import { ApiService } from '../app/shared/api.service';
 // import { AuthGuard } from './users/_services/auth-guard.service';
  import { AuthGuard } from './users/_services/auth-guard.service';
  import {ConfigService} from './config/config.service';

  /** Module   */
  import { UserModule } from './users/user.module';
  import { NstbalanceinputModule } from './nstbalanceinputs/nstbalanceinput.module';

  import { LoginRoutingModule } from './users/login/login-routing.module';
  import { LoginComponent } from './users/login/login.component';

  export function tokenGetter() {
    return localStorage.getItem('token');
  }

/* Feature Modules */
import { MessageModule} from './messages/message.module';
import { AppComponent } from './app.component';
import { MessageComponent } from './messages/message.component';
import { WelcomeComponent } from './home/welcome.component';
 import { PageNotFoundComponent } from './page-not-found.component';
 import { httpInterceptorProviders } from './http-interceptors';
import { UserService } from './users/_services/user.service';
import { ConfigComponent } from './config/config.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
  //  LoginComponent,
     PageNotFoundComponent,
  ConfigComponent
  ],
  imports: [
    BrowserModule,
  HttpModule,
  HttpClientModule,
  AppRoutingModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  HttpClientXsrfModule.withOptions({
    cookieName: 'My-Xsrf-Cookie',
    headerName: 'My-Xsrf-Header',
  }),
  MessageModule,
// AppRoutingModule,
  /*  HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),*/
   /*HttpClientInMemoryWebApiModule.forRoot(
      BalanceData, { dataEncapsulation: false }
   ),*/
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
         whitelistedDomains: ['localhost:3000', 'localhost:3100'],
    //  blacklistedRoutes: ['localhost:3000']
      }
    }),

// NstbalanceinputModule,
// UserModule,
// LoginRoutingModule,
// ConvertoSpacePipeModule,
// NstbalanceinputModule,
/* MessageModule,
AppRoutingModule*/
  ],

  providers: [
  //   AuthService,
   AuthGuard,
  AuthService,
  ConfigService,
// JwtHelperService,
  // UserService,
    HttpErrorHandler,
 { provide: RequestCache, useClass: RequestCacheWithMap },
 httpInterceptorProviders,
 // provider used to create fake backend
 fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
   // Diagnostic only: inspect router configuration
   constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
 }
