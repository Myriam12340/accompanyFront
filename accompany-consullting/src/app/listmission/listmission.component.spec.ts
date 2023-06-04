import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListmissionComponent } from './listmission.component';

describe('ListmissionComponent', () => {
  let component: ListmissionComponent;
  let fixture: ComponentFixture<ListmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListmissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
