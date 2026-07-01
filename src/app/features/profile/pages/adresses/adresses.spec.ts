import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adresses } from './adresses';

describe('Adresses', () => {
  let component: Adresses;
  let fixture: ComponentFixture<Adresses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adresses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adresses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
