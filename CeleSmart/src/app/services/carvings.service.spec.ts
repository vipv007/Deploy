import { TestBed } from '@angular/core/testing';

import { CarvingsService } from './carvings.service';

describe('CarvingsService', () => {
  let service: CarvingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarvingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
