
import {AdminComponent} from './admin.component';
import {ManageNstbalanceinputsComponent} from './manage-nstbalanceinputs.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AuthGuard } from '../users/_services/auth-guard.service';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
// canActivate: [AuthGuard],
    children: [
      {
        path: '',
// canActivateChild: [AuthGuard],
        children: [
          { path: 'nstbalanceinputs', component: ManageNstbalanceinputsComponent },
      //    { path: 'heroes', component: ManageHeroesComponent },
       { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
//  declarations: [AdminDashboardComponent]
})
export class AdminRoutingModule {}
