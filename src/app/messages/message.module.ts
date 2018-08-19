

import { NgModule } from '@angular/core';
import { MessageComponent } from './message.component';
import {RouterModule} from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MessageService } from './message.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'messages',
        component: MessageComponent,
        outlet: 'popup'
      }

    ])
  ],
  declarations: [MessageComponent
  ],
  providers: [
    MessageService
]
})
export class MessageModule { }
