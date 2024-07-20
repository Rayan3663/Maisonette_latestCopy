import { TestBed } from '@angular/core/testing';

import { SalesTabServiceService } from './sales-tab-service.service';

describe('SalesTabServiceService', () => {
  let service: SalesTabServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesTabServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
