import { TestBed, async, inject } from '@angular/core/testing';

import { NstbalanceinputGuardService } from './nstbalanceinput.guard.service';

describe('NstbalanceinputGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NstbalanceinputGuardService]
    });
  });

  it('should ...', inject([NstbalanceinputGuardService], (guard: NstbalanceinputGuardService) => {
    expect(guard).toBeTruthy();
  }));
});
