import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantdetailComponent } from './consultantdetail.component';

describe('ConsultantdetailComponent', () => {
  let component: ConsultantdetailComponent;
  let fixture: ComponentFixture<ConsultantdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultantdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
