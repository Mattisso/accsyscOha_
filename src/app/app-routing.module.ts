import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard} from './users/_services/auth-guard.service';
import { SelectiveStrategy } from './selective-strategy.service';

const appRoutes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  { path: 'nstbalanceinputs',
  // canActivate: [AuthGuardLogin],
 data: { preload: true },
    loadChildren: 'app/nstbalanceinputs/nstbalanceinput.module#NstbalanceinputModule'
  },

  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule',
    canLoad: [AuthGuard]
  },

    { path: 'users',
    // canActivate: [AuthGuard],
    data: { preload: true },
      loadChildren: 'app/users/user.module#UserModule'
     },
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];


@NgModule({
imports: [
  RouterModule.forRoot(
    appRoutes,
    {enableTracing: true, preloadingStrategy: SelectiveStrategy})
/*
    [
    {path: 'welcome', component: WelcomeComponent},
  /*  { path: 'users',
    // canActivate: [AuthGuardLogin],
      data: { preload: true },
      loadChildren: 'app/users/user.module#UserModule' },*/
   /* { path: 'nstbalanceinputs',
  // canActivate: [AuthGuardLogin],
    data: { preload: true },
    loadChildren: 'app/nstbalanceinputs/nstbalanceinput.module#NstbalanceinputModule' },*/
   /* { path: 'nstbalances',
 // canActivate: [AuthGuardLogin],
      data: { preload: true },
      loadChildren: 'app/nstbalances/nstbalance.module#NstbalanceModule' },
      { path: 'nttbalances',
  //     canActivate: [AuthGuardLogin],
        data: { preload: true },
        loadChildren: 'app/nttbalances/nttbalance.module#NttbalanceModule' },*/
    /*{ path: 'users',
    // canActivate: [AuthGuardLogin],
      data: { preload: true },
      loadChildren: 'app/users/user.module#UserModule' },*/
     /* { path: 'upload',
      // canActivate: [AuthGuardLogin],
      data: { preload: true },
        loadChildren: 'app/fileuploads/fileupload.module#FileuploadModule'},*/
  /*  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
  ], {enableTracing: true, preloadingStrategy: SelectiveStrategy})*/
],
exports: [RouterModule],
providers: [SelectiveStrategy],
})

export  class AppRoutingModule {}



// app/models/nstbalanceinputs/nstbalanceinput.module#NstbalanceinputModule
