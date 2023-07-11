import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcoountBalanceComponent } from './acoount-balance.component';

describe('AcoountBalanceComponent', () => {
  let component: AcoountBalanceComponent;
  let fixture: ComponentFixture<AcoountBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcoountBalanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcoountBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
