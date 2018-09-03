import { Component , OnInit} from '@angular/core';

import { first } from 'rxjs/operators';

import { IUser } from '../users/user';

import { UserService} from '../users/_services/user.service';

@Component({
    templateUrl: './welcome.component.html'
})
export class WelcomeComponent  implements OnInit {
    public pageTitle = 'Welcome';
    users: IUser[] = [];
    currentUser: IUser;

    constructor(public userService: UserService) {

      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
      this.loadAllUsers();
    }


    deleteUser( user: IUser| string) {
      const id = typeof user === 'string' ? user : user.id;
      this.userService.deleteUser(id).pipe(first()).subscribe(() => {
          this.loadAllUsers();
      });
  }
  loadAllUsers(): void {
    this.userService.getUsers().pipe(first()).subscribe(users => {
        this.users = users;
        console.log(users);
    });
}


}
