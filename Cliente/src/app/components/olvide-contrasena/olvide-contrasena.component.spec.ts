import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlvideContrasenaComponent } from './olvide-contrasena.component';

describe('OlvideContrasenaComponent', () => {
  let component: OlvideContrasenaComponent;
  let fixture: ComponentFixture<OlvideContrasenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlvideContrasenaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OlvideContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
