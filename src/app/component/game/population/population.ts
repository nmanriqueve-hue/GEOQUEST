import { Component } from '@angular/core';
import { Navbar } from '../../navbar/navbar';
import { Questions } from '../../questions/questions';

@Component({
  selector: 'app-population',
  imports: [Navbar, Questions],
  templateUrl: './population.html',
  styleUrl: './population.css',
})
export class Population {}
