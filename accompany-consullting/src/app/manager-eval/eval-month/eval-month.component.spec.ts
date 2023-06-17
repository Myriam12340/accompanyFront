import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalMonthComponent } from './eval-month.component';

describe('EvalMonthComponent', () => {
  let component: EvalMonthComponent;
  let fixture: ComponentFixture<EvalMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvalMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
