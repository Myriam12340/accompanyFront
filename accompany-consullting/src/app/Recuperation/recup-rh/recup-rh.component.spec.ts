import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecupRHComponent } from './recup-rh.component';

describe('RecupRHComponent', () => {
  let component: RecupRHComponent;
  let fixture: ComponentFixture<RecupRHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecupRHComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecupRHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
