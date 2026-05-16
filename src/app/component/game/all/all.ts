import { Component } from '@angular/core';
import { Navbar } from '../../navbar/navbar';
import { Questions } from '../../questions/questions';

@Component({
  selector: 'app-all',
  imports: [Navbar, Questions],
  templateUrl: './all.html',
  styleUrl: './all.css',
})
export class All {}
