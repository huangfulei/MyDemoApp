import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentComponent2 } from './payment.component2';

describe('PaymentComponent', () => {
  let component: PaymentComponent2;
  let fixture: ComponentFixture<PaymentComponent2>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentComponent2 ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
