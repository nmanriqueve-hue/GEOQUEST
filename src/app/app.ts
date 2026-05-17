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
  esAdmin = false;

  mostrarNavbar = false;

  // Rutas donde NO aparece el navbar
  private rutasSinNavbar = ['/login', '/register', '/', ];

  constructor(private router: Router) {
    this.esAdmin = this.router.url.includes('/admin');

    // Revisar cada vez que cambie la ruta
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
      this.esAdmin = e.urlAfterRedirects.includes('/admin');
    });

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
      this.mostrarNavbar = !this.rutasSinNavbar.includes(e.urlAfterRedirects);
    });
  }


}
