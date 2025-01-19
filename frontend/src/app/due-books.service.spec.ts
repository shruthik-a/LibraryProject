import { TestBed } from '@angular/core/testing';

import { DueBooksService } from './due-books.service';

describe('DueBooksService', () => {
  let service: DueBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DueBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
