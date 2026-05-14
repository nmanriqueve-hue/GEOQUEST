import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-conocer-mas',
  imports: [
    RouterLink
  ],
  templateUrl: './conocer-mas.html',
  styleUrl: './conocer-mas.css',
})
export class ConocerMas {

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
