import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntretientComponent } from './entretient.component';

describe('EntretientComponent', () => {
  let component: EntretientComponent;
  let fixture: ComponentFixture<EntretientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntretientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntretientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
