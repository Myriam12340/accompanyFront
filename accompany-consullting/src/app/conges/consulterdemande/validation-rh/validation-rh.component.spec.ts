import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationRhComponent } from './validation-rh.component';

describe('ValidationRhComponent', () => {
  let component: ValidationRhComponent;
  let fixture: ComponentFixture<ValidationRhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationRhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
