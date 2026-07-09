import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalQuotation } from './total-quotation';

describe('TotalQuotation', () => {
  let component: TotalQuotation;
  let fixture: ComponentFixture<TotalQuotation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalQuotation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalQuotation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
