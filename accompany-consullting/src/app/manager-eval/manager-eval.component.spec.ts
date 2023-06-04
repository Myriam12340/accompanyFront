import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerEvalComponent } from './manager-eval.component';

describe('ManagerEvalComponent', () => {
  let component: ManagerEvalComponent;
  let fixture: ComponentFixture<ManagerEvalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerEvalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerEvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
