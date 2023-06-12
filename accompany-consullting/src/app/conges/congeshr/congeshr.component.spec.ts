import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeshrComponent } from './congeshr.component';

describe('CongeshrComponent', () => {
  let component: CongeshrComponent;
  let fixture: ComponentFixture<CongeshrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongeshrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongeshrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
