import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntretiensuivantComponent } from './entretiensuivant.component';

describe('EntretiensuivantComponent', () => {
  let component: EntretiensuivantComponent;
  let fixture: ComponentFixture<EntretiensuivantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntretiensuivantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntretiensuivantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
