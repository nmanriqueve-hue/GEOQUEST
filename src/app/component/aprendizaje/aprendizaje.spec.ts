import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Aprendizaje } from './aprendizaje';

describe('Aprendizaje', () => {
  let component: Aprendizaje;
  let fixture: ComponentFixture<Aprendizaje>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Aprendizaje],
    }).compileComponents();

    fixture = TestBed.createComponent(Aprendizaje);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
