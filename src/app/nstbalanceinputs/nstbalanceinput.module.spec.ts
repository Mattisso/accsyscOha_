import { NstbalanceinputModule } from './nstbalanceinput.module';

describe('NstbalanceinputModule', () => {
  let nstbalanceinputModule: NstbalanceinputModule;

  beforeEach(() => {
    nstbalanceinputModule = new NstbalanceinputModule();
  });

  it('should create an instance', () => {
    expect(nstbalanceinputModule).toBeTruthy();
  });
});
