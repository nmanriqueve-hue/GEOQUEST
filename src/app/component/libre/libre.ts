import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-libre',
  imports: [RouterLink],
  templateUrl: './libre.html',
  styleUrl: './libre.css',
})
export class Libre {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

}
