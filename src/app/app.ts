import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { NgIf } from '@angular/common';
import { Navbar } from './component/navbar/navbar';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, Navbar],
  templateUrl: './app.html',
})
export class App {

  mostrarNavbar = false;

  private rutasSinNavbar = ['/login', '/register', '/'];

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: NavigationEnd) => {
      this.mostrarNavbar = !this.rutasSinNavbar.includes(e.urlAfterRedirects);
    });
  }
}
