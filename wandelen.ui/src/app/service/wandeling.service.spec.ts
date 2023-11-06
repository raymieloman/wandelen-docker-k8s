import { TestBed } from '@angular/core/testing';

import { WandelingService } from './wandeling.service';

describe('WandelingService', () => {
  let service: WandelingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WandelingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
