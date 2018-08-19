import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NstbalanceinputListComponent, NstbalanceinputDetailComponent, NstbalanceinputEditComponent } from '.';
import { NstbalanceinputResolverService } from './nstbalanceinput-resolver.service';
import { NstbalanceinputEditGuard } from './nstbalanceinput.guard.service';

const nstbalanceinputsRoutes: Routes = [
  {
    path: '',
// data: { preload: true },
    component: NstbalanceinputListComponent,
  },
  {
    path: ':id',
 //   data: { preload: true },
//  canActivate: [NstbalanceinputDetailGuard],
    component: NstbalanceinputDetailComponent,
   resolve: { balance: NstbalanceinputResolverService }
  },

  {
    path: ':id/edit',
  //  data: { preload: true },
    component: NstbalanceinputEditComponent,
//  canDeactivate: [NstbalanceinputEditGuard],
  resolve: { balance: NstbalanceinputResolverService }
}
];

@NgModule({
  imports: [
  RouterModule.forChild(
    nstbalanceinputsRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    NstbalanceinputResolverService
  ]
})
export class NstbalanceinputsRoutesModule { }
