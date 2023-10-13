import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupeconsulterComponent } from './groupeconsulter.component';

describe('GroupeconsulterComponent', () => {
  let component: GroupeconsulterComponent;
  let fixture: ComponentFixture<GroupeconsulterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupeconsulterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupeconsulterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
