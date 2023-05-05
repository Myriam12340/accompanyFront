import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntretientdetailComponent } from './entretientdetail.component';

describe('EntretientdetailComponent', () => {
  let component: EntretientdetailComponent;
  let fixture: ComponentFixture<EntretientdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntretientdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntretientdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
