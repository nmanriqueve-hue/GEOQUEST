import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PartidaService {

  private url = 'http://localhost:8081/partida';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  iniciarPartidaCategoria(categoria: number, username: string): Observable<any> {
    const params = new HttpParams()
      .set('categoria', categoria)
      .set('username', username);

    return this.http.get(`${this.url}/iniciarCategoria`, { params });
  }

  iniciarPartidaDificultad(dificultad: number, username: string): Observable<any> {
    const params = new HttpParams()
      .set('dificultad', dificultad)
      .set('username', username);

    return this.http.get(`${this.url}/iniciardificultad`, { params });
  }

  finalizarPartida(id: number, cantRes: number, puntos: number): Observable<any> {
    const params = new HttpParams()
      .set('id', id)
      .set('respuestaCorrecta', cantRes)  // ← nombre exacto del @RequestParam
      .set('puntos', puntos);

    return this.http.put(`${this.url}/update`, null, { params });
  }

}
