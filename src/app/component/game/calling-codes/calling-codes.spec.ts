import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallingCodes } from './calling-codes';

describe('CallingCodes', () => {
  let component: CallingCodes;
  let fixture: ComponentFixture<CallingCodes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallingCodes],
    }).compileComponents();

    fixture = TestBed.createComponent(CallingCodes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
