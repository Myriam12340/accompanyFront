import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantEvalMissionComponent } from './consultant-eval-mission.component';

describe('ConsultantEvalMissionComponent', () => {
  let component: ConsultantEvalMissionComponent;
  let fixture: ComponentFixture<ConsultantEvalMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultantEvalMissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantEvalMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
