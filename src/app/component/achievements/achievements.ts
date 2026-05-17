import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

export type TipoLogro =
  | 'PARTIDAS_JUGADAS'
  | 'RESPUESTAS_CORRECTAS'
  | 'PUNTOS_TOTALES'
  | 'CATEGORIAS_DESCUBIERTAS'
  | 'PRIMERA_VICTORIA'
  | 'MASTER_CATEGORIA'
  | 'RANKING';

export interface Logro {
  idLogro: number;
  descripcion: string;
  objetivo: string;
  tipo: TipoLogro;
  puntosRecompensa: number;
  desbloqueado: boolean;
}

export const TIPO_CONFIG: Record<TipoLogro, { icon: string; label: string; color: string }> = {
  PARTIDAS_JUGADAS: { icon: '🎮', label: 'Games Played', color: '#2596be' },
  RESPUESTAS_CORRECTAS: { icon: '✅', label: 'Correct Answers', color: '#2db87c' },
  PUNTOS_TOTALES: { icon: '⭐', label: 'Total Points', color: '#f0c040' },
  CATEGORIAS_DESCUBIERTAS: { icon: '🗺️', label: 'Categories Discovered', color: '#b97a5f' },
  PRIMERA_VICTORIA: { icon: '🏆', label: 'First Victory', color: '#f0c040' },
  MASTER_CATEGORIA: { icon: '👑', label: 'Category Master', color: '#9b59b6' },
  RANKING: { icon: '📊', label: 'Ranking', color: '#e05252' },
};

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './achievements.html',
  styleUrl: './achievements.css',
})
export class Achievements implements OnInit {
  tipoConfig = TIPO_CONFIG;

  logros: Logro[] = [
    {
      idLogro: 1,
      descripcion: 'First Match',
      objetivo: 'Play your first match',
      tipo: 'PRIMERA_VICTORIA',
      puntosRecompensa: 50,
      desbloqueado: true,
    },
    {
      idLogro: 2,
      descripcion: 'Explorer',
      objetivo: 'Play 10 matches',
      tipo: 'PARTIDAS_JUGADAS',
      puntosRecompensa: 100,
      desbloqueado: true,
    },
    {
      idLogro: 3,
      descripcion: 'Veteran',
      objetivo: 'Play 50 matches',
      tipo: 'PARTIDAS_JUGADAS',
      puntosRecompensa: 300,
      desbloqueado: false,
    },
    {
      idLogro: 4,
      descripcion: 'On a Streak',
      objetivo: 'Get 5 correct answers in a row',
      tipo: 'RESPUESTAS_CORRECTAS',
      puntosRecompensa: 75,
      desbloqueado: true,
    },
    {
      idLogro: 5,
      descripcion: 'Unstoppable',
      objetivo: 'Get 10 correct answers in a row',
      tipo: 'RESPUESTAS_CORRECTAS',
      puntosRecompensa: 200,
      desbloqueado: false,
    },
    {
      idLogro: 6,
      descripcion: 'Perfect!',
      objetivo: 'Achieve 100% accuracy in one round',
      tipo: 'RESPUESTAS_CORRECTAS',
      puntosRecompensa: 150,
      desbloqueado: true,
    },
    {
      idLogro: 7,
      descripcion: 'Collector',
      objetivo: 'Accumulate 1000 total points',
      tipo: 'PUNTOS_TOTALES',
      puntosRecompensa: 100,
      desbloqueado: false,
    },
    {
      idLogro: 8,
      descripcion: 'Millionaire',
      objetivo: 'Accumulate 5000 total points',
      tipo: 'PUNTOS_TOTALES',
      puntosRecompensa: 500,
      desbloqueado: false,
    },
    {
      idLogro: 9,
      descripcion: 'Curious',
      objetivo: 'Play 3 different categories',
      tipo: 'CATEGORIAS_DESCUBIERTAS',
      puntosRecompensa: 80,
      desbloqueado: true,
    },
    {
      idLogro: 10,
      descripcion: 'World Traveler',
      objetivo: 'Discover all categories',
      tipo: 'CATEGORIAS_DESCUBIERTAS',
      puntosRecompensa: 400,
      desbloqueado: false,
    },
    {
      idLogro: 11,
      descripcion: 'Flags Master',
      objetivo: 'Complete Flags on hard difficulty',
      tipo: 'MASTER_CATEGORIA',
      puntosRecompensa: 250,
      desbloqueado: false,
    },
    {
      idLogro: 12,
      descripcion: 'Top 10',
      objetivo: 'Reach the top 10 in the ranking',
      tipo: 'RANKING',
      puntosRecompensa: 350,
      desbloqueado: false,
    },
  ];

  get totalLogros() {
    return this.logros.length;
  }

  get logrosDesbloqueados() {
    return this.logros.filter((l) => l.desbloqueado).length;
  }

  get porcentaje() {
    return Math.round((this.logrosDesbloqueados / this.totalLogros) * 100);
  }

  get tiposUnicos(): TipoLogro[] {
    return [...new Set(this.logros.map((l) => l.tipo))];
  }

  getLogrosPorTipo(tipo: TipoLogro) {
    return this.logros.filter((l) => l.tipo === tipo);
  }

  ngOnInit(): void {}
}
