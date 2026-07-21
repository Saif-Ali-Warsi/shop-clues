import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalLoading } from './portal-loading';

describe('PortalLoading', () => {
  let component: PortalLoading;
  let fixture: ComponentFixture<PortalLoading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalLoading]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortalLoading);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
