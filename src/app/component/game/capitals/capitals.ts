import { Component } from '@angular/core';
import { Navbar } from '../../navbar/navbar';
import { Questions } from '../../questions/questions';

@Component({
  selector: 'app-capitals',
  imports: [Navbar, Questions],
  templateUrl: './capitals.html',
  styleUrl: './capitals.css',
})
export class Capitals {}
