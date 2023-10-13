import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitegroupeComponent } from './traitegroupe.component';

describe('TraitegroupeComponent', () => {
  let component: TraitegroupeComponent;
  let fixture: ComponentFixture<TraitegroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraitegroupeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitegroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
