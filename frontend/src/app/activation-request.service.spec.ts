import { TestBed } from '@angular/core/testing';

import { ActivationRequestService } from './activation-request.service';

describe('ActivationRequestService', () => {
  let service: ActivationRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivationRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
