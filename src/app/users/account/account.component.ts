import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from '../../messages/message.service';
import { UserService} from '../_services/user.service';
import { AuthService} from '../_services/auth.service';

import { IUser } from '../user';



@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user: IUser;
  isLoading = true;
  errorMessage: string;
  constructor(private authService: AuthService,
     private messageService: MessageService,
     private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getUser(this.authService.currentUser.id).subscribe(
      data => this.user = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }


  saveBalance(): void {
          this.userService.saveBalance(this.user)
        .subscribe(
          () => this.onSaveComplete(`${this.user.username} was saved`),
          (error: any) => this.errorMessage = <any>error
        );

        }


  onSaveComplete(message?: string): void {
   if (message) {
    this.messageService.getMessage();
  }
    // Navigate back to the user list
 this.router.navigate(['/users']);
}



}
