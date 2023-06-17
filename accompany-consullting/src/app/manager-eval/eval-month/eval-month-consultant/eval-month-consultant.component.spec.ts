import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalMonthConsultantComponent } from './eval-month-consultant.component';

describe('EvalMonthConsultantComponent', () => {
  let component: EvalMonthConsultantComponent;
  let fixture: ComponentFixture<EvalMonthConsultantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvalMonthConsultantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalMonthConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
