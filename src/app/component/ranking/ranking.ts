import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface JugadorRanking {
  posicion: number;
  usuario: string;
  partidasJugadas: number;
  precision: number;
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

  jugadores: JugadorRanking[] = [
    { posicion: 1, usuario: 'nataly',     partidasJugadas: 31, precision: 88, puntosTotales: 4800 },
    { posicion: 2, usuario: 'luna',       partidasJugadas: 24, precision: 90, puntosTotales: 3400 },
    { posicion: 3, usuario: 'isabella',   partidasJugadas: 18, precision: 95, puntosTotales: 2100 },
    { posicion: 4, usuario: 'explorer99', partidasJugadas: 12, precision: 74, puntosTotales: 1850 },
    { posicion: 5, usuario: 'geoking',    partidasJugadas: 9,  precision: 81, puntosTotales: 1200 },
  ];

  get top3(): JugadorRanking[] {
    return this.jugadores.slice(0, 3);
  }

  get jugadoresFiltrados(): JugadorRanking[] {
    const q = this.busqueda.toLowerCase();
    return q
      ? this.jugadores.filter(j => j.usuario.toLowerCase().includes(q))
      : this.jugadores;
  }

  ngOnInit(): void {
    // this.rankingService.getRanking().subscribe(data => this.jugadores = data);
  }
}
