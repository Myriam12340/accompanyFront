import { TestBed } from '@angular/core/testing';

import { EntretientService } from './entretient.service';

describe('EntretientService', () => {
  let service: EntretientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntretientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
