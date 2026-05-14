import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-perfil',
  imports: [RouterLink],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  usuario: string | null = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.usuario = this.authService.getNombreDesdeToken();
    console.log('Usuario:', this.usuario);
  }


  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    console.log('Sesión cerrada correctamente');
  }
}
