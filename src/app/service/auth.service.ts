import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse, UsuarioDTO } from '../model/usuario.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/auth';

  constructor(private http: HttpClient) {}

  login(user: UsuarioDTO): Observable<AuthResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('Enviando al backend:', headers);
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, user, { headers }).pipe(
      tap((response) => {
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('userRole', response.role);
        console.log('Token guardado:', response.token);
      }),
    );

  }

  public getUser(): string | null {
    return sessionStorage.getItem('usuario');
  }

  getUserRole(): string | null {
    return sessionStorage.getItem('userRole');
  }

  hasRole(role: string): boolean {
    const userRole = this.getUserRole();
    return userRole === role;
  }

  hasAnyRole(roles: string[]): boolean {
    const userRole = this.getUserRole();
    return roles.includes(userRole || '');
  }

  register(user: UsuarioDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, {
      responseType: 'text',
    });
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userRole');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    const isLogged = !!token;
    console.log('¿Está logueado?:', isLogged);
    return isLogged;
  }

  getNombreDesdeToken(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      console.log('Token decodificado:', decoded);
      return decoded.nombre || decoded.sub || decoded.username || null;
    } catch (error) {
      console.error('Error decodificando token:', error);
      return null;
    }
  }

  getUserInfo() {
    return {
      token: this.getToken(),
      role: this.getUserRole(),
      isLoggedIn: this.isLoggedIn(),
    };
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) return false;
    return token.length > 10;
  }
}
