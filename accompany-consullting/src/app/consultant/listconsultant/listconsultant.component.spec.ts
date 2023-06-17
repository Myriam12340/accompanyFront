import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListconsultantComponent } from './listconsultant.component';

describe('ListconsultantComponent', () => {
  let component: ListconsultantComponent;
  let fixture: ComponentFixture<ListconsultantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListconsultantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListconsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
