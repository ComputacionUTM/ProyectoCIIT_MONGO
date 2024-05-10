import { TestBed } from '@angular/core/testing';

import { OfertaLaboralService } from './oferta-laboral.service';

describe('OfertaLaboralService', () => {
  let service: OfertaLaboralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfertaLaboralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
