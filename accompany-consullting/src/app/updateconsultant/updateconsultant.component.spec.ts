import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateconsultantComponent } from './updateconsultant.component';

describe('UpdateconsultantComponent', () => {
  let component: UpdateconsultantComponent;
  let fixture: ComponentFixture<UpdateconsultantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateconsultantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateconsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
