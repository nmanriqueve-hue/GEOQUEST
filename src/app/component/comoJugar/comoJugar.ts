import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-como-jugar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './comoJugar.html',
  styleUrl: './comoJugar.css',
})
export class ComoJugar {

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
