import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailRecruteurComponent } from './mail-recruteur.component';

describe('MailRecruteurComponent', () => {
  let component: MailRecruteurComponent;
  let fixture: ComponentFixture<MailRecruteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailRecruteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailRecruteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
