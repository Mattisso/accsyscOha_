import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NstbalanceinputListComponent } from './nstbalanceinput-list/nstbalanceinput-list.component';
import { NstbalanceinputDetailComponent } from './nstbalanceinput-detail/nstbalanceinput-detail.component';
import { NstbalanceinputEditComponent } from './nstbalanceinput-edit/nstbalanceinput-edit.component';
import { NstbalanceinputFilterPipe } from './nstbalanceinput-filter.pipe';


// Imports for loading & configuring the in-memory web api
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import {BalanceData} from '../mock-data/nstbalanceinputdata';

import { NstbalanceinputService } from './nstbalanceinput.service';
import { NstbalanceinputResolverService } from './nstbalanceinput-resolver.service';
// import { AuthGuard } from '../user/auth-guard.service';
import { NstbalanceinputsRoutesModule } from './nstbalanceinput-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NstbalanceinputEditGuard } from './nstbalanceinput.guard.service';
import { NstbalanceinputSearchComponent } from './nstbalanceinput-search/nstbalanceinput-search.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
  HttpClientInMemoryWebApiModule.forRoot(BalanceData, { dataEncapsulation: false }),

    NstbalanceinputsRoutesModule,
    /* RouterModule.forChild([
       {
         path: '',
         component: NstbalanceinputListComponent,
       },
       {
         path: ':id',
     //  canActivate: [NstbalanceinputDetailGuard],
         component: NstbalanceinputDetailComponent,
         resolve: { balance: NstbalanceinputResolverService }
       },

       {
         path: ':id/edit',
         component: NstbalanceinputEditComponent,
       canDeactivate: [NstbalanceinputEditGuard],
       resolve: { balance: NstbalanceinputResolverService }
     }
       ])*/

  ],

  declarations: [NstbalanceinputListComponent, NstbalanceinputDetailComponent, NstbalanceinputEditComponent, NstbalanceinputFilterPipe, NstbalanceinputSearchComponent],
  providers: [NstbalanceinputService
    , NstbalanceinputEditGuard
    //   ,NstbalanceinputDetailGuard
    , NstbalanceinputResolverService
  ]

})
export class NstbalanceinputModule { }
