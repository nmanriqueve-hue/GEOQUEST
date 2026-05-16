import { Component } from '@angular/core';
import { Navbar } from '../../navbar/navbar';
import { Questions } from '../../questions/questions';

@Component({
  selector: 'app-continents',
  imports: [Navbar, Questions],
  templateUrl: './continents.html',
  styleUrl: './continents.css',
})
export class Continents {}
