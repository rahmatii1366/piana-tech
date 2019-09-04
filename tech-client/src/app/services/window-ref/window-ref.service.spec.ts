import { TestBed } from '@angular/core/testing';

import { PianaWindowRefService } from './window-ref.service';

describe('PianaWindowRefService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PianaWindowRefService = TestBed.get(PianaWindowRefService);
    expect(service).toBeTruthy();
  });
});
