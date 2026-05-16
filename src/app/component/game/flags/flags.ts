import { Component } from '@angular/core';
import { Navbar } from '../../navbar/navbar';
import { Questions } from '../../questions/questions';

@Component({
  selector: 'app-flags',
  imports: [Navbar, Questions],
  templateUrl: './flags.html',
  styleUrl: './flags.css',
})
export class Flags {}
