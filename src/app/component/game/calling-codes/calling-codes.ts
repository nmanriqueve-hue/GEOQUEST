import { Component } from '@angular/core';
import { Navbar } from '../../navbar/navbar';
import { Questions } from '../../questions/questions';

@Component({
  selector: 'app-calling-codes',
  imports: [Navbar, Questions],
  templateUrl: './calling-codes.html',
  styleUrl: './calling-codes.css',
})
export class CallingCodes {}
