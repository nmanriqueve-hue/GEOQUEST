import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Libre } from './libre';

describe('Libre', () => {
  let component: Libre;
  let fixture: ComponentFixture<Libre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Libre],
    }).compileComponents();

    fixture = TestBed.createComponent(Libre);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
