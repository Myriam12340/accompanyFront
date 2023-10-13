import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiperationValidateurComponent } from './requiperation-validateur.component';

describe('RequiperationValidateurComponent', () => {
  let component: RequiperationValidateurComponent;
  let fixture: ComponentFixture<RequiperationValidateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequiperationValidateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequiperationValidateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
