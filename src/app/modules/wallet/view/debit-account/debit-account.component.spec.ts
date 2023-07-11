import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitAccountComponent } from './debit-account.component';

describe('DebitAccountComponent', () => {
  let component: DebitAccountComponent;
  let fixture: ComponentFixture<DebitAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebitAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebitAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
