import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { Observable, Subscription, fromEvent, merge} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { MessageService } from '../../messages/message.service';

import { INstbalanceinput } from '../nstbalanceinput';
import { NstbalanceinputService } from '../nstbalanceinput.service';

import { NumberValidators } from '../../shared/number.validator';
import { GenericValidator } from '../../shared/generic-validator';


@Component({
  selector: 'app-nstbalanceinput-edit',
  templateUrl: './nstbalanceinput-edit.component.html',
  styleUrls: ['./nstbalanceinput-edit.component.css']
})
export class NstbalanceinputEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'Balance Sheet Edit';
  errorMessage: string;
  nstbalanceinputForm: FormGroup;

  balance: INstbalanceinput;

  private sub: Subscription;


// Use with the generic validation message class
displayMessage: { [key: string]: string } = {};
private validationMessages: { [key: string]: { [key: string]: string } };
private genericValidator: GenericValidator;
/*
get tags(): FormArray {
  return <FormArray>this.nstbalanceinputForm.get('tags');
} */


constructor(private fb: FormBuilder,
  private route: ActivatedRoute,
  private router: Router,
  private balanceInputService: NstbalanceinputService,
 private messageService: MessageService
 ) {

// Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      IntitulCompte: {
          required: 'Intitule Compte name is required.',
          minlength: 'Intitule Compte name must be at least three characters.',
          maxlength: 'Intitule Compte name cannot exceed 50 characters.'
      },
      NumCompte: {
          required: 'Compte Number is required.'
      }/* ,
      SoldeDebit: {
        required: 'Rate the Compte between 1 (lowest) and 5 (highest).'
      } */
  };

  // Define an instance of the validator for use with this form,
  // passing in this form's set of validation messages.
  this.genericValidator = new GenericValidator(this.validationMessages);
 }

ngOnInit(): void {
  this.nstbalanceinputForm = this.fb.group({
    IntitulCompte: ['', [Validators.required,
                       Validators.minLength(3),
                       Validators.maxLength(50)]],
    NumCompte: ['', Validators.required],
  //  SoldeDebit: ['', Validators.required],
 //   tags: this.fb.array([]),
 SoldeDebit: '',
 SoldeCredit: ''
});

   // Read the product Id from the route parameter
this.sub = this.route.params.subscribe(
params => {
const id = params['id'];
this.getBalance(id);
}
  );

}

ngOnDestroy(): void {
this.sub.unsubscribe();
}


getBalance(id: string) {
this.balanceInputService.getBalance(id)
    .subscribe(
            (balance: INstbalanceinput) => this.onbalanceRetrieved(balance),
            (error: any) => this.errorMessage = <any>error
    );
  }


ngAfterViewInit(): void {
  // Watch for the blur event from any input element on the form.
  const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
  // Merge the blur event observable with the valueChanges observable
  merge(this.nstbalanceinputForm.valueChanges, ...controlBlurs).pipe(debounceTime(800)).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.nstbalanceinputForm);
  });
}


/* addTag(): void {
    this.tags.push(new FormControl());
} */

  onbalanceRetrieved(balance: INstbalanceinput): void {
    if (this.nstbalanceinputForm) {
        this.nstbalanceinputForm.reset();
    }

    this.balance = balance;

    if (this.balance.id === null) {
        this.pageTitle = 'Add balance';
    } else {
        this.pageTitle = `Edit balance: ${this.balance.IntitulCompte}`;
    }

// Update the data on the form
this.nstbalanceinputForm.patchValue({
IntitulCompte: this.balance.IntitulCompte,
NumCompte: this.balance.NumCompte,
SoldeDebit: this.balance.SoldeDebit,
SoldeCredit: this.balance.SoldeCredit
});
// this.nstbalanceinputForm.setControl('tags', this.fb.array(this.balance.tags || []));

}

deleteBalance(): void {
  if (this.balance.id === null) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
} else {
      if (confirm(`Really delete the balance: ${this.balance.IntitulCompte}?`)) {
          this.balanceInputService.deleteBalance(this.balance.id)
              .subscribe(
                  () => this.onSaveComplete(`${this.balance.IntitulCompte} was deleted`),
                  (error: any) => this.errorMessage = <any>error
              );
      }
  }
}

saveBalance(): void {
  if (this.nstbalanceinputForm.dirty && this.nstbalanceinputForm.valid) {
  // Copy the form values over the product object values
      const p = Object.assign({}, this.balance, this.nstbalanceinputForm.value);

      this.balanceInputService.saveBalance(p)
      .subscribe(
        () => this.onSaveComplete(`${this.balance.IntitulCompte} was saved`),
        (error: any) => this.errorMessage = <any>error
      );
        }   else if (!this.nstbalanceinputForm.dirty) {
                this.onSaveComplete();
        }
                  // this.errorMessage='please correct the validation errors.';
}


onSaveComplete(message?: string): void {
 if (message) {
  this.messageService.getMessage();
}
 // Reset the form to clear the flags
    this.nstbalanceinputForm.reset();
  // Navigate back to the product list
  this.router.navigate(['/nstbalanceinputs']);
}




}
