import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-aprendizaje',
  imports: [
    RouterLink
  ],
  templateUrl: './aprendizaje.html',
  styleUrl: './aprendizaje.css',
})
export class Aprendizaje {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    console.log('Sesión cerrada correctamente');
  }


}
