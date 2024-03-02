import { TestBed } from '@angular/core/testing';

import { OptimizationServiceService } from './optimization-service.service';

describe('OptimizationServiceService', () => {
  let service: OptimizationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OptimizationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
