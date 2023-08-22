import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEval6Component } from './show-eval6.component';

describe('ShowEval6Component', () => {
  let component: ShowEval6Component;
  let fixture: ComponentFixture<ShowEval6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowEval6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEval6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
