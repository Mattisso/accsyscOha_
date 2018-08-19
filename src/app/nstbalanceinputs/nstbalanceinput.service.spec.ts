import { TestBed, inject } from '@angular/core/testing';

import { NstbalanceinputService } from './nstbalanceinput.service';

describe('NstbalanceinputService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NstbalanceinputService]
    });
  });

  it('should be created', inject([NstbalanceinputService], (service: NstbalanceinputService) => {
    expect(service).toBeTruthy();
  }));
});
