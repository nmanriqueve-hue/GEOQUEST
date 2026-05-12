import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConocerMas } from './conocer-mas';

describe('ConocerMas', () => {
  let component: ConocerMas;
  let fixture: ComponentFixture<ConocerMas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConocerMas],
    }).compileComponents();

    fixture = TestBed.createComponent(ConocerMas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
