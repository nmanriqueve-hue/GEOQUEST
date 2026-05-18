import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioDTO } from '../model/usuario.model';
import { Observable } from 'rxjs';
import { Logro } from '../component/achievements/achievements';

@Injectable({
  providedIn: 'root',
})
export class AuditoriaService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'https://stream-alumni-exorcist.ngrok-free.dev/auditoria';


  getAuditoria(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getall`);
  }
}
