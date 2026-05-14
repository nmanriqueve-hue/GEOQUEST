import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-modo',
  imports: [
    RouterLink
  ],
  templateUrl: './modo.html',
  styleUrl: './modo.css',
})
export class Modo {

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
