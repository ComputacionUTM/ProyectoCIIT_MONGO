import { TestBed } from '@angular/core/testing';

import { CambioIdiomaService } from './cambio-idioma.service';

describe('CambioIdiomaService', () => {
  let service: CambioIdiomaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CambioIdiomaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
