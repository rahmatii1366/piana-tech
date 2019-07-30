import { TestBed } from '@angular/core/testing';

import { CustomBrowserXhrService } from './custom-browser-xhr.service';

describe('CustomBrowserXhrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomBrowserXhrService = TestBed.get(CustomBrowserXhrService);
    expect(service).toBeTruthy();
  });
});
