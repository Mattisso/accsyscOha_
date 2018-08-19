import { TestBed, inject } from '@angular/core/testing';

import { NstbalanceinputResolverService } from './nstbalanceinput-resolver.service';

describe('NstbalanceinputResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NstbalanceinputResolverService]
    });
  });

  it('should be created', inject([NstbalanceinputResolverService], (service: NstbalanceinputResolverService) => {
    expect(service).toBeTruthy();
  }));
});
