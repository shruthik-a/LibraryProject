import { TestBed } from '@angular/core/testing';

import { ReturnEntryService } from './return-entry.service';

describe('ReturnEntryService', () => {
  let service: ReturnEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReturnEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
