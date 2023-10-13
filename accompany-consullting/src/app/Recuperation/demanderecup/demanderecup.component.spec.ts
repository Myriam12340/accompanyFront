import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemanderecupComponent } from './demanderecup.component';

describe('DemanderecupComponent', () => {
  let component: DemanderecupComponent;
  let fixture: ComponentFixture<DemanderecupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemanderecupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemanderecupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
