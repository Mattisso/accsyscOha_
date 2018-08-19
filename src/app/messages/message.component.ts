import { Component, OnDestroy, OnInit} from '@angular/core';
import { MessageService } from './message.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {


  private subscription: Subscription;
    message: any;
    constructor(private messageService: MessageService,
      private router: Router) {

         // subscribe to alert messages
         this.subscription = messageService.getMessage().subscribe(message => { this.message = message; });
       }


      ngOnDestroy(): void {
        // unsubscribe on destroy to prevent memory leaks
        this.subscription.unsubscribe();
    }
    cancel() {
      this.close();
    }

    close(): void {
      // Close the popup.
      this.router.navigate([{ outlets: { popup: null } }]);
      // this.messageService.isDisplayed = false;
      }

  ngOnInit() {
  }

}
