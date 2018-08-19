import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

/*
describe('LoginForm', () => {
  let expectedEmail = 'blacksonic@example.com';
  let expectedPassword = 'SuperSecret';

  describe('Isolated', () => {
    let subject: LoginFormComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [LoginFormComponent],
        imports: [FormsModule, ReactiveFormsModule]
      });
    });
    beforeEach(inject([LoginFormComponent], (loginForm: LoginFormComponent) => {
      subject = loginForm;
    }));

    it('should send credentials on submit', () => {
      subject.submitted.subscribe(({ email, password }) => {
        expect(email).toEqual(expectedEmail);
        expect(password).toEqual(expectedPassword);
      });

      subject.onSubmit({ email: expectedEmail, password: expectedPassword });
    });
  });

  describe('Shallow', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [LoginFormComponent],
        imports: [FormsModule, ReactiveFormsModule]
      });
      TestBed.compileComponents();
    }));

    it('should send credentials on submit', () => {
      let fixture = TestBed.createComponent(LoginFormComponent);
      let component: LoginFormComponent = fixture.componentInstance;
      let element = fixture.nativeElement;

      fixture.detectChanges();

      element.querySelector('#login-email').value = expectedEmail;
      element.querySelector('#login-email').dispatchEvent(new Event('input'));
      element.querySelector('#login-password').value = expectedPassword;
      element.querySelector('#login-password').dispatchEvent(new Event('input'));

      fixture.detectChanges();

      component.submitted.subscribe(({ email, password }) => {
        expect(email).toEqual(expectedEmail);
        expect(password).toEqual(expectedPassword);
      });

      element.querySelector('button[type="submit"]').click();
    });
  });

  describe('Integration', () => {
    @Component({
      selector: 'site',
      template: `
          <login-form [email]="email" (submitted)="onFormSubmit($event)"></login-form>
      `
    })
    class SiteComponent {
      email = expectedEmail;

      storedEmail: string;

      storedPassword: string;

      onFormSubmit({ email, password }) {
        this.storedEmail = email;
        this.storedPassword = password;
      }
    }

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [LoginFormComponent, SiteComponent],
        imports: [FormsModule, ReactiveFormsModule]
      });
      TestBed.compileComponents();
    }));

    it('should send credentials on submit', () => {
      let fixture = TestBed.createComponent(SiteComponent);
      let component: SiteComponent = fixture.componentInstance;
      let element = fixture.nativeElement;

      fixture.detectChanges();

      expect(element.querySelector('#login-email').value).toEqual(expectedEmail);

      element.querySelector('#login-password').value = expectedPassword;
      element.querySelector('#login-password').dispatchEvent(new Event('input'));

      fixture.detectChanges();

      element.querySelector('button[type="submit"]').click();

      expect(component.storedEmail).toEqual(expectedEmail);
      expect(component.storedPassword).toEqual(expectedPassword);
    });
  });

});

*/
