import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { ManageNstbalanceinputsComponent } from './manage-nstbalanceinputs.component';
// import { ManageHeroesComponent }    from './manage-heroes.component';

import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    ManageNstbalanceinputsComponent
  ]
})
export class AdminModule { }
