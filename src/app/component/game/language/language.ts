import { Component } from '@angular/core';
import { Navbar } from '../../navbar/navbar';
import { Questions } from '../../questions/questions';

@Component({
  selector: 'app-language',
  imports: [Navbar, Questions],
  templateUrl: './language.html',
  styleUrl: './language.css',
})
export class Language {}
