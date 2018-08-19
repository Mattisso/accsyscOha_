import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { MessageService } from '../../messages/message.service';
import { UserService } from '../_services/user.service';
import { IUser } from '../user';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loading = false;
  user: IUser;
  submitted = false;
  errorMessage: string;
  pageTitle = 'Register User ';
  private sub: Subscription;
  registerForm: FormGroup;
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);
  /*   email = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]); */
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  role = new FormControl('', [
    Validators.required
  ]);
  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService) { }



  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      username: this.username,
      //     email: this.email,
      password: this.password,
      role: this.role
    });

     // convenience getter for easy access to form fields
/*
    // Read the product Id from the route parameter
    this.sub = this.route.params.subscribe(
      params => {
        const id = params['id'];
     //    this.getUser(id);
      }
    );
*/
  }

  get f() { return this.registerForm.controls; }


  setClassUsername() {
    return { 'has-danger': !this.username.pristine && !this.username.valid };
  }
  /*
    setClassEmail() {
      return { 'has-danger': !this.email.pristine && !this.email.valid };
    }
  */
  setClassPassword() {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }


  onbalanceRetrieved(user: IUser): void {
    if (this.registerForm) {
      this.registerForm.reset();
    }

    this.user = user;

    if (this.user.id === null) {
      this.pageTitle = 'Register user';
    } else {
      this.pageTitle = `Edit user: ${this.user.username}`;
    }

    // Update the data on the form
    this.registerForm.patchValue({
      username: this.user.username,
      // email: this.email,
      password: this.user.password,
      role: this.user.role
    });
    // this.registerForm.setControl('tags', this.fb.array(this.user.tags || []));

  }



/*
  getUser(id: string) {
    this.userService.getUser(id)
      .subscribe(
        (user: IUser) => this.onbalanceRetrieved(user),
        (error: any) => this.errorMessage = <any>error
      );
  }*/
  /*
    register() {
      this.loading = true;
      this.userService.saveBalance(this.registerForm.value)
          .subscribe(
              data => {
                  this.messageService.success('Registration successful', true);
                  this.router.navigate(['/login']);
              },
              error => {
                  this.messageService.error(error);
                  this.loading = false;
              });
  }
  */


 register(): void {

  this.submitted = true;

  // stop here if form is invalid
  if (this.registerForm.invalid) {
      return;
  }

    if (this.registerForm.dirty && this.registerForm.valid) {
      // Copy the form values over the product object values
      const p = Object.assign({}, this.user, this.registerForm.value);

      this.userService.saveBalance(p)
      .pipe(first())
        .subscribe(
          () => {
            this.onSaveComplete(`${this.user.username} was saved`);
            this.router.navigate(['/users/login']);
        },
        error => {
            this.messageService.error(error);
            this.loading = false;
        }


        );
    } else if (!this.registerForm.dirty) {
      this.onSaveComplete();
    }
    // this.errorMessage='please correct the validation errors.';
  }



  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.getMessage();
    }
    // Reset the form to clear the flags
    this.registerForm.reset();
    // Navigate back to the product list
    this.router.navigate(['/users/login']);
  }


}
