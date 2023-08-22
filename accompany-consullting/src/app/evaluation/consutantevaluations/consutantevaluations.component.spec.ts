import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsutantevaluationsComponent } from './consutantevaluations.component';

describe('ConsutantevaluationsComponent', () => {
  let component: ConsutantevaluationsComponent;
  let fixture: ComponentFixture<ConsutantevaluationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsutantevaluationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsutantevaluationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
