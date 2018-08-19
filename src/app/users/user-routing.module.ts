import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { LoginComponent } from './login';
import { AuthGuard } from './_services/auth-guard.service';
import { RegisterComponent } from './register';
import { LogoutComponent } from './logout/logout.component';
import { AdminComponent } from '../admin/admin.component';
import { AccountComponent } from './account/account.component';

import { LoginComponent } from './login/login.component';
const usersRoutes: Routes = [
  { path: 'register', component: RegisterComponent },
{ path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'account',
    // canActivate: [AuthGuardLogin],
    component: AccountComponent
  },
  { path: 'admin',
 //  canActivate: [AuthGuard] ,
  component: AdminComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(usersRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
