import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEvaluationIntegrationComponent } from './show-evaluation-integration.component';

describe('ShowEvaluationIntegrationComponent', () => {
  let component: ShowEvaluationIntegrationComponent;
  let fixture: ComponentFixture<ShowEvaluationIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowEvaluationIntegrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEvaluationIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
