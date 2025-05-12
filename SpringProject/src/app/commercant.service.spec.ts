import { TestBed } from '@angular/core/testing';

import { CommercantService } from './commercant.service';

describe('CommercantService', () => {
  let service: CommercantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommercantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
