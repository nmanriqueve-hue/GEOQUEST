import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  constructor(private authService: AuthService, private router: Router, private usuarioService:UsuarioService) {
  }

  esAdmin = false;

  ngOnInit(): void {
    this.verificarUsuario()
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: NavigationEnd) => {
      this.verificarUsuario();
    });
  }
  private verificarUsuario(): void {
    if(this.authService.getUserRole() === 'ADMIN'){
      this.esAdmin = true;
    }else{
      this.esAdmin = false;
    }
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
