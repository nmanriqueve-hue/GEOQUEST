import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modo } from './modo';

describe('Modo', () => {
  let component: Modo;
  let fixture: ComponentFixture<Modo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modo],
    }).compileComponents();

    fixture = TestBed.createComponent(Modo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
