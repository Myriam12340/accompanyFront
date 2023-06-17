import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsManagerComponent } from './missions-manager.component';

describe('MissionsManagerComponent', () => {
  let component: MissionsManagerComponent;
  let fixture: ComponentFixture<MissionsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionsManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
