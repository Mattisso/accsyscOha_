import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NstbalanceinputSearchComponent } from './nstbalanceinput-search.component';

describe('NstbalanceinputSearchComponent', () => {
  let component: NstbalanceinputSearchComponent;
  let fixture: ComponentFixture<NstbalanceinputSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NstbalanceinputSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NstbalanceinputSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
