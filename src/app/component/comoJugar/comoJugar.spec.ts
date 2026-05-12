import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComoJugar } from './comoJugar';

describe('comoJugar', () => {
  let component: ComoJugar;
  let fixture: ComponentFixture<ComoJugar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComoJugar],
    }).compileComponents();

    fixture = TestBed.createComponent(ComoJugar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
