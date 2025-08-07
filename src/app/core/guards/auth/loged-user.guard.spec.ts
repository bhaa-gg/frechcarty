import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { logedUserGuard } from './loged-user.guard';

describe('logedUserGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => logedUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
