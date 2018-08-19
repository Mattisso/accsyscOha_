import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService} from '../messages/message.service';
import { UserService} from '../users/_services/user.service';

import { AuthService} from '../users/_services/auth.service';
import { IUser } from '../users/user';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
 user: IUser;
  users: IUser[];
  pageTitle = 'Admin LogIn';
  errorMessage: string;
  isLoading = true;
  private sub: Subscription;
  constructor(
    private route: ActivatedRoute,
    public auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }


  getUsers(): void {
    this.userService.getUsers()
    .subscribe(
      users => this.users = users,
      error =>  this.errorMessage = <any>error,
      () => this.isLoading = false);
  }

  deleteUser(): void {
  //   this.users = this.users.filter(h => h  !== user);
    if (this.user.id === null || this.user.id === undefined) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
} else {
  if (confirm(`Are you sure you want to delete:   ${this.user.username} ?`)) {
    this.userService.deleteUser(this.user.id)
    .subscribe(
      () => this.onSaveComplete(`${this.user.username} was deleted`),
      (error: any) => this.errorMessage = <any>error,
      () => this.getUsers()
    );
  }

}


  }

  onSaveComplete(message?: string): void {
    if (message) {
     this.messageService.getMessage();
   }
    // Reset the form to clear the flags
    //   this.nstbalanceinputForm.reset();
     // Navigate back to the product list
     this.router.navigate(['/users']);
 }

}
