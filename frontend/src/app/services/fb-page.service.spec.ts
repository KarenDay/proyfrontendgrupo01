import { TestBed } from '@angular/core/testing';

import { FbPageService } from './fb-page.service';

describe('FbPageService', () => {
  let service: FbPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FbPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
