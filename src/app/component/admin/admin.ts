import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { UsuarioService } from '../../service/usuario.service';
import { AuditoriaService } from '../../service/auditoria.service';
import { UsuarioDTO } from '../../model/usuario.model';

export interface UsuarioAdmin {
  id: number;
  usuario: UsuarioDTO;
  rol: 'ADMIN' | 'USER';
  partidasJugadas: number;
  puntosTotales: number;
  ultimoAcceso: Date;
  baneado: boolean;
}

export type TipoAccion = 'login' | 'partida' | 'logro' | 'registro';

export interface RegistroActividad {
  id: number;
  usuario: UsuarioDTO;
  tipo: TipoAccion;
  detalle: string;
  categoria?: string;
  puntos?: number;
  precision?: number;
  fecha: Date;
  accionLabel?:string;

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
    private cdr: ChangeDetectorRef
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
          usuario: u as UsuarioDTO,
          rol: u.role as 'ADMIN' | 'USER',
          partidasJugadas: 0,
          puntosTotales: u.puntosTotales,
          ultimoAcceso: new Date(),
          baneado: !u.accountNonLocked
        }));
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  cargarHistorial(): void {
    this.auditoriaService.getAuditoria().subscribe({
      next: (data) => {
        console.log('DATA AUDITORIA:', JSON.stringify(data[0]));
        this.historial = data.map((a: any) => ({
          id: a.idAuditoria,
          usuario: a.usuario as UsuarioDTO,
          tipo: a.tipoAccion.toLowerCase() as TipoAccion,
          accionLabel: this.getLabelAccion(a.tipoAccion),
          detalle: a.detalle,
          fecha: new Date(a.fecha),
          puntos: this.extraerPuntos(a.detalle),
          precision: this.extraerPrecision(a.detalle)
        }));
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  extraerPrecision(detalle: string): number | undefined {
    // saca "7" de "7/10 correct"
    const match = detalle?.match(/(\d+)\/10 correct/);
    return match ? Number(match[1]) : undefined;
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
    return q ? this.usuarios.filter(u => u.usuario.nombreUsuario.toLowerCase().includes(q)) : this.usuarios;
  }

  get historialFiltrado(): RegistroActividad[] {
    const q = this.filtroHistorial.toLowerCase();
    return q ? this.historial.filter(h => h.usuario.nombreUsuario.toLowerCase().includes(q)) : this.historial;
  }

  getHistorialUsuario(usuario: string): RegistroActividad[] {
    return this.historial.filter(h => h.usuario.nombreUsuario === usuario);
  }

  toggleBan(u: UsuarioAdmin): void {
    if (u.rol === 'ADMIN') return;
    console.log('Baneando:', u.usuario);

    this.usuarioService.toggleBan(u.usuario.nombreUsuario).subscribe({
      next: (res) => {
        console.log('Respuesta ban:', res);
        u.baneado = !u.baneado;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error ban:', err)
    });
  }

  confirmarEliminar(u: UsuarioAdmin): void {
    if (u.rol === 'ADMIN') return;
    this.usuarioAEliminar = u;
  }

  eliminarUsuario(): void {
    if (!this.usuarioAEliminar) return;
    this.usuarioService.eliminarUsuarioPorNombre(this.usuarioAEliminar.usuario.nombreUsuario).subscribe({
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

  descargarCSV(): void {
    const encabezado = ['User', 'Action', 'Detail', 'Correct', 'Points', 'Date'];

    const filas = this.historial.map(h => [
      h.usuario.nombreUsuario,
      // sin emojis
      h.tipo.toUpperCase(),
      h.detalle || '',
      h.precision !== undefined ? h.precision + '/10' : '',
      h.puntos ?? '',
      new Date(h.fecha).toLocaleString('es-CO')
    ]);

    const contenido = [encabezado, ...filas]
      .map(fila => fila.map(celda => `"${String(celda).replace(/"/g, '""')}"`).join(';')) // ← punto y coma para Excel en español
      .join('\r\n');

    // BOM para que Excel reconozca UTF-8
    const bom = '\uFEFF';
    const blob = new Blob([bom + contenido], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `auditoria_${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }
}
