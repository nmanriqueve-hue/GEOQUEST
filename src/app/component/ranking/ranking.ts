import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../service/usuario.service';

export interface JugadorRanking {
  posicion: number;
  usuario: string;
  puntosTotales: number;
}

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './ranking.html',
  styleUrl: './ranking.css',
})
export class Ranking implements OnInit {

  busqueda = '';
  jugadores: JugadorRanking[] = [];

  constructor(private usuarioService: UsuarioService, private cdr: ChangeDetectorRef ) {}

  ngOnInit(): void {
    this.usuarioService.getRankingUsuarios().subscribe(data => {
      console.log(data);
      this.jugadores = data;
      this.cdr.detectChanges();
    });
  }

  get jugadoresFiltrados(): JugadorRanking[] {
    const q = this.busqueda.toLowerCase();
    return q
      ? this.jugadores.filter(j => j.usuario.toLowerCase().includes(q))
      : this.jugadores;
  }
}
