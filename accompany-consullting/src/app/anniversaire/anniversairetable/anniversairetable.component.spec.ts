import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnniversairetableComponent } from './anniversairetable.component';

describe('AnniversairetableComponent', () => {
  let component: AnniversairetableComponent;
  let fixture: ComponentFixture<AnniversairetableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnniversairetableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnniversairetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
