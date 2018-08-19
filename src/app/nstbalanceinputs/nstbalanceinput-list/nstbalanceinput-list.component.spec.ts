import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NstbalanceinputListComponent } from './nstbalanceinput-list.component';

describe('NstbalanceinputListComponent', () => {
  let component: NstbalanceinputListComponent;
  let fixture: ComponentFixture<NstbalanceinputListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NstbalanceinputListComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NstbalanceinputListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
