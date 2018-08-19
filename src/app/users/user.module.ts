
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
 import { JwtModule } from '@auth0/angular-jwt';
import {HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login';
import { UserService} from './_services/user.service';
import {AuthGuard } from './_services/auth-guard.service';
import { AuthGuardAdmin } from './_services/auth-guard-admin.service';
// import { JwtInterceptorProvider, ErrorInterceptorProvider } from './_helper';
import { AuthService} from './_services/auth.service';
import {UserRoutingModule} from './user-routing.module';


import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register';
import { LogoutComponent } from './logout/logout.component';
import { AdminComponent } from '../admin/admin.component';
import { AccountComponent } from './account/account.component';
import { AboutComponent } from './about/about.component';

/*
export function tokenGetter() {
  return localStorage.getItem('token');
}*/

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserRoutingModule
/*
    RouterModule.forChild([
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'logout', component: LogoutComponent },
      { path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin] },
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin] }
        ])*/
  ],
  declarations: [
    RegisterComponent,
   LoginComponent,
    LogoutComponent,
    AdminComponent,
    AccountComponent,
    AboutComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
 //   AuthGuardAdmin,
  //  JwtInterceptorProvider,
  //  ErrorInterceptorProvider
  ]
})


export class UserModule { }
