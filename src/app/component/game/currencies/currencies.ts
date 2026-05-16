import { Component } from '@angular/core';
import { Navbar } from '../../navbar/navbar';
import { Questions } from '../../questions/questions';

@Component({
  selector: 'app-currencies',
  imports: [Navbar, Questions],
  templateUrl: './currencies.html',
  styleUrl: './currencies.css',
})
export class Currencies {}
