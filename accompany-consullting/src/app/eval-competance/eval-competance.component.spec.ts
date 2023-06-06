import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalCompetanceComponent } from './eval-competance.component';

describe('EvalCompetanceComponent', () => {
  let component: EvalCompetanceComponent;
  let fixture: ComponentFixture<EvalCompetanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvalCompetanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalCompetanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
