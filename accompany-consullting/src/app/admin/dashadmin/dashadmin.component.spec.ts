import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashadminComponent } from './dashadmin.component';

describe('DashadminComponent', () => {
  let component: DashadminComponent;
  let fixture: ComponentFixture<DashadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
