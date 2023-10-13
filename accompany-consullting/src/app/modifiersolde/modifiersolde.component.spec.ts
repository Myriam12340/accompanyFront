import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiersoldeComponent } from './ModifiersoldeComponent';

describe('ModifiersoldeComponent', () => {
  let component: ModifiersoldeComponent;
  let fixture: ComponentFixture<ModifiersoldeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifiersoldeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifiersoldeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
