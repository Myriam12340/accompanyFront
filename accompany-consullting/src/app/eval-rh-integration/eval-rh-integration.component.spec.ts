import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalRhIntegrationComponent } from './eval-rh-integration.component';

describe('EvalRhIntegrationComponent', () => {
  let component: EvalRhIntegrationComponent;
  let fixture: ComponentFixture<EvalRhIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvalRhIntegrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalRhIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
