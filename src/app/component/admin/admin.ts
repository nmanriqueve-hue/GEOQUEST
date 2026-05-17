import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

export interface UsuarioAdmin {
  id: number;
  usuario: string;
  rol: 'ADMIN' | 'USER';
  partidasJugadas: number;
  puntosTotales: number;
  ultimoAcceso: Date;
  baneado: boolean;
}

export type TipoAccion = 'login' | 'partida' | 'logro' | 'registro';

export interface RegistroActividad {
  id: number;
  usuario: string;
  tipo: TipoAccion;
  accionLabel: string;
  categoria?: string;
  dificultad?: 'facil' | 'medio' | 'dificil';
  puntos?: number;
  precision?: number;
  fecha: Date;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, DatePipe],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {

  nombreAdmin = '';
  tabActivo: 'usuarios' | 'historial' = 'usuarios';

  busqueda = '';
  filtroHistorial = '';

  usuarioAEliminar: UsuarioAdmin | null = null;
  usuarioHistorial: UsuarioAdmin | null = null;

  usuarios: UsuarioAdmin[] = [
    { id: 1, usuario: 'admin', rol: 'ADMIN', partidasJugadas: 0, puntosTotales: 0, ultimoAcceso: new Date(), baneado: false },
    { id: 2, usuario: 'luna', rol: 'USER', partidasJugadas: 24, puntosTotales: 3400, ultimoAcceso: new Date('2026-05-15'), baneado: false },
    { id: 3, usuario: 'isabella', rol: 'USER', partidasJugadas: 18, puntosTotales: 2100, ultimoAcceso: new Date('2026-05-14'), baneado: false },
    { id: 4, usuario: 'nataly', rol: 'USER', partidasJugadas: 31, puntosTotales: 4800, ultimoAcceso: new Date('2026-05-16'), baneado: false },
    { id: 5, usuario: 'spammer1', rol: 'USER', partidasJugadas: 2, puntosTotales: 50, ultimoAcceso: new Date('2026-05-10'), baneado: true },
  ];

  historial: RegistroActividad[] = [
    { id: 1, usuario: 'luna', tipo: 'registro', accionLabel: '🆕 Registration', fecha: new Date('2026-05-01') },
    { id: 2, usuario: 'luna', tipo: 'login', accionLabel: '🔑 Login', fecha: new Date('2026-05-10') },
    { id: 3, usuario: 'luna', tipo: 'partida', accionLabel: '🎮 Match', categoria: 'Flags', dificultad: 'facil', puntos: 320, precision: 90, fecha: new Date('2026-05-10') },
    { id: 4, usuario: 'luna', tipo: 'partida', accionLabel: '🎮 Match', categoria: 'Capitals', dificultad: 'medio', puntos: 580, precision: 85, fecha: new Date('2026-05-12') },
    { id: 5, usuario: 'luna', tipo: 'logro', accionLabel: '🏆 Achievement Earned', categoria: 'On a Streak', fecha: new Date('2026-05-12') },
    { id: 6, usuario: 'isabella', tipo: 'registro', accionLabel: '🆕 Registration', fecha: new Date('2026-05-02') },
    { id: 7, usuario: 'isabella', tipo: 'partida', accionLabel: '🎮 Match', categoria: 'Languages', dificultad: 'dificil', puntos: 900, precision: 95, fecha: new Date('2026-05-14') },
    { id: 8, usuario: 'nataly', tipo: 'registro', accionLabel: '🆕 Registration', fecha: new Date('2026-05-03') },
    { id: 9, usuario: 'nataly', tipo: 'partida', accionLabel: '🎮 Match', categoria: 'Names', dificultad: 'medio', puntos: 450, precision: 80, fecha: new Date('2026-05-16') },
    { id: 10, usuario: 'spammer1', tipo: 'login', accionLabel: '🔑 Login', fecha: new Date('2026-05-10') },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.nombreAdmin = this.authService.getNombreDesdeToken() || 'Admin';
  }

  get totalUsuarios() {
    return this.usuarios.length;
  }

  get usuariosActivos() {
    return this.usuarios.filter(u => !u.baneado).length;
  }

  get usuariosBaneados() {
    return this.usuarios.filter(u => u.baneado).length;
  }

  get totalPartidas() {
    return this.usuarios.reduce((s, u) => s + u.partidasJugadas, 0);
  }

  get usuariosFiltrados(): UsuarioAdmin[] {
    const q = this.busqueda.toLowerCase();
    return q
      ? this.usuarios.filter(u => u.usuario.toLowerCase().includes(q))
      : this.usuarios;
  }

  get historialFiltrado(): RegistroActividad[] {
    const q = this.filtroHistorial.toLowerCase();
    return q
      ? this.historial.filter(h => h.usuario.toLowerCase().includes(q))
      : this.historial;
  }

  getHistorialUsuario(usuario: string): RegistroActividad[] {
    return this.historial.filter(h => h.usuario === usuario);
  }

  toggleBan(u: UsuarioAdmin): void {
    if (u.rol === 'ADMIN') return;
    u.baneado = !u.baneado;
  }

  confirmarEliminar(u: UsuarioAdmin): void {
    if (u.rol === 'ADMIN') return;
    this.usuarioAEliminar = u;
  }

  eliminarUsuario(): void {
    if (!this.usuarioAEliminar) return;

    this.usuarios = this.usuarios.filter(
      u => u.id !== this.usuarioAEliminar!.id
    );

    this.usuarioAEliminar = null;
  }

  verHistorial(u: UsuarioAdmin): void {
    this.usuarioHistorial = u;
    this.tabActivo = 'historial';
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
