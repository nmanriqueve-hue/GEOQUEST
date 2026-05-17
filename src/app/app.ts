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

  // Rutas donde NO aparece el navbar
  private rutasSinNavbar = ['/questions/categoria/', '/questions/dificultad/'];

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
      const url = e.urlAfterRedirects;
      this.mostrarNavbar = !this.rutasSinNavbar.some(ruta => url.startsWith(ruta));
    });
  }
}
