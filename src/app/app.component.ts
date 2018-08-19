import {AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';

import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';

 import { AuthService } from './users/_services/auth.service';
import { MessageService } from './messages/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {
  pageTitle = 'Accounting Systeme Ohada';
  loading = true;
  showConfig = true;
    constructor( public authService: AuthService,
      private router: Router,
      private messageService: MessageService,
      private changeDetector: ChangeDetectorRef) {
      router.events.subscribe((routerEvent: Event) => {
        this.checkRouterEvent(routerEvent);
      });

    }
    checkRouterEvent(routerEvent: Event): void {
  if (routerEvent instanceof NavigationStart) {
  this.loading = true;
  }



        if (routerEvent instanceof NavigationEnd ||
          routerEvent instanceof NavigationCancel ||
          routerEvent instanceof NavigationError) {
          this.loading = false;
        }
    }

    displayMessages(): void {
      this.router.navigate([{ outlets: { popup: ['messages'] } }]);
      this.messageService.isDisplayed = true;
  }

  toggleConfig() { this.showConfig = !this.showConfig; }

  hideMessages(): void {
      this.router.navigate([{ outlets: { popup: null } }]);
      this.messageService.isDisplayed = false;
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  logOut(): void {
     //  this.authService.logout();
      this.router.navigateByUrl('/welcome');
  }
}
