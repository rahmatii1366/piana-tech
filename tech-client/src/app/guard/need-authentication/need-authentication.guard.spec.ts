import { TestBed, async, inject } from '@angular/core/testing';

import { NeedAuthenticationGuard } from './need-authentication-guard.service';

describe('NeedAuthenticationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NeedAuthenticationGuard]
    });
  });

  it('should ...', inject([NeedAuthenticationGuard], (guard: NeedAuthenticationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
