import { TestBed } from '@angular/core/testing';

import { RootContainerService } from './root-container.service';

describe('RootContainerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RootContainerService = TestBed.get(RootContainerService);
    expect(service).toBeTruthy();
  });
});
