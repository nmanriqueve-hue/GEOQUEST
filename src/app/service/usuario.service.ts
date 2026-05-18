import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioDTO } from '../model/usuario.model';
import { Observable } from 'rxjs';
import { Logro } from '../component/achievements/achievements';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'http://localhost:8081/usuario';

  crearUsuario(usuario: UsuarioDTO): Observable<any> {
    const params = new HttpParams()
      .set('usuario', usuario.nombreUsuario)
      .set('password', usuario.password);

    return this.http.post(`${this.baseUrl}/crear`, null, {
      params: params,
      responseType: 'text',
    });
  }

  crearUsuarioJSON(usuario: UsuarioDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/createjson`, usuario, {
      responseType: 'text',
    });
  }

  login(correo: string, contrasenia: string): Observable<any> {
    const params = new HttpParams().set('usuario', correo).set('password', contrasenia);

    return this.http.post(`${this.baseUrl}/checklogin`, null, {
      params: params,
      responseType: 'text',
    });
  }

  getRanking(username: string): Observable<number> {
    const params = new HttpParams().set('username', username);
    return this.http.get<number>(`${this.baseUrl}/ranking`, { params });
  }

  getLogros(username: string): Observable<number> {
    const params = new HttpParams().set('username', username);
    return this.http.get<number>(`${this.baseUrl}/cantlogros`, { params });
  }

  getPreguntasCorrectas(username: string): Observable<number> {
    const params = new HttpParams().set('username', username);
    return this.http.get<number>(`${this.baseUrl}/preguntascorrectas`, { params });
  }

  getPartidasJugadas(username: string): Observable<number> {
    const params = new HttpParams().set('username', username);
    return this.http.get<number>(`${this.baseUrl}/partidasjugadas`, { params });
  }

  getLogrosUsuario(username: string): Observable<Logro[]> {
    const params = new HttpParams().set('username', username);
    return this.http.get<Logro[]>(`${this.baseUrl}/logros`, { params });
  }

  eliminarUsuarioPorNombre(username: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deletebyname`, {
      params: new HttpParams().set('name', username),
      responseType: 'text'
    });
  }

  ban(username: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/ban`, null, {
      params: new HttpParams().set('username', username),
      responseType: 'text'
    });
  }

  getAllUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getall`);
  }

  obtenerTodosUsuarios(): Observable<UsuarioDTO[]> {
    return this.http.get<UsuarioDTO[]>(`${this.baseUrl}/getall`);
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deletebyid/${id}`, {
      responseType: 'text',
    });
  }
}
