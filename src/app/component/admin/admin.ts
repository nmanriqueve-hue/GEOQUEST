import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { UsuarioService } from '../../service/usuario.service';
import { AuditoriaService } from '../../service/auditoria.service';

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
  imports: [CommonModule, FormsModule, DatePipe],
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
  usuarios: UsuarioAdmin[] = [];
  historial: RegistroActividad[] = [];

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private auditoriaService: AuditoriaService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.nombreAdmin = this.authService.getNombreDesdeToken() || 'Admin';
    if (this.authService.getToken()) {
      this.cargarUsuarios();
      this.cargarHistorial();
    }
  }

  cargarUsuarios(): void {
    this.usuarioService.getAllUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data.map((u: any) => ({
          id: u.idUsuario,
          usuario: u.nombreUsuario,
          rol: u.role as 'ADMIN' | 'USER',
          partidasJugadas: 0,
          puntosTotales: u.puntosTotales,
          ultimoAcceso: new Date(),
          baneado: !u.accountNonLocked
        }));
      },
      error: (err) => console.error(err)
    });
  }

  cargarHistorial(): void {
    this.auditoriaService.getAuditoria().subscribe({
      next: (data) => {
        this.historial = data.map((a: any) => ({
          id: a.idAuditoria,
          usuario: a.nombreUsuario,
          tipo: a.tipoAccion.toLowerCase() as TipoAccion,
          accionLabel: this.getLabelAccion(a.tipoAccion),
          fecha: new Date(a.fecha),
          puntos: this.extraerPuntos(a.detalle)
        }));
      },
      error: (err) => console.error(err)
    });
  }

  getLabelAccion(tipo: string): string {
    switch (tipo) {
      case 'LOGIN':    return '🔑 Login';
      case 'PARTIDA':  return '🎮 Match';
      case 'LOGRO':    return '🏆 Achievement';
      case 'REGISTRO': return '🆕 Registration';
      default:         return tipo;
    }
  }

  extraerPuntos(detalle: string): number | undefined {
    const match = detalle?.match(/(\d+) pts/);
    return match ? Number(match[1]) : undefined;
  }

  get totalUsuarios() { return this.usuarios.length; }
  get usuariosActivos() { return this.usuarios.filter(u => !u.baneado).length; }
  get usuariosBaneados() { return this.usuarios.filter(u => u.baneado).length; }
  get totalPartidas() { return this.historial.filter(h => h.tipo === 'partida').length; }

  get usuariosFiltrados(): UsuarioAdmin[] {
    const q = this.busqueda.toLowerCase();
    return q ? this.usuarios.filter(u => u.usuario.toLowerCase().includes(q)) : this.usuarios;
  }

  get historialFiltrado(): RegistroActividad[] {
    const q = this.filtroHistorial.toLowerCase();
    return q ? this.historial.filter(h => h.usuario.toLowerCase().includes(q)) : this.historial;
  }

  getHistorialUsuario(usuario: string): RegistroActividad[] {
    return this.historial.filter(h => h.usuario === usuario);
  }

  toggleBan(u: UsuarioAdmin): void {
    if (u.rol === 'ADMIN') return;
    this.usuarioService.ban(u.usuario).subscribe({
      next: () => u.baneado = !u.baneado,
      error: (err) => console.error(err)
    });
  }

  confirmarEliminar(u: UsuarioAdmin): void {
    if (u.rol === 'ADMIN') return;
    this.usuarioAEliminar = u;
  }

  eliminarUsuario(): void {
    if (!this.usuarioAEliminar) return;
    this.usuarioService.eliminarUsuarioPorNombre(this.usuarioAEliminar.usuario).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter(u => u.id !== this.usuarioAEliminar!.id);
        this.usuarioAEliminar = null;
      },
      error: (err) => console.error(err)
    });
  }

  verHistorial(u: UsuarioAdmin): void {
    this.usuarioHistorial = u;
    this.tabActivo = 'historial';
  }

}
