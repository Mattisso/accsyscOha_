import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NstbalanceinputDetailComponent } from './nstbalanceinput-detail.component';

describe('NstbalanceinputDetailComponent', () => {
  let component: NstbalanceinputDetailComponent;
  let fixture: ComponentFixture<NstbalanceinputDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NstbalanceinputDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NstbalanceinputDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
