import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-perfil',
  imports: [RouterLink],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  usuario: string = '';
  ranking: number = 0;
  preguntasCorrectas: number = 0;
  partidasJugadas: number = 0;
  logros: number = 0;

  constructor(
    private usuarioSer: UsuarioService,
    private authSer: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.usuario = <string>this.authSer.getNombreDesdeToken();

    this.usuarioSer.getRanking(this.usuario).subscribe({
      next: (ranking) => {
        this.ranking = ranking;
        this.cdr.detectChanges();
      }
    });

    this.usuarioSer.getPreguntasCorrectas(this.usuario).subscribe({
      next: (correctas) => {
        this.preguntasCorrectas = correctas;
        this.cdr.detectChanges();
      }
    });

    this.usuarioSer.getPartidasJugadas(this.usuario).subscribe({
      next: (partidas) => {
        this.partidasJugadas = partidas;
        this.cdr.detectChanges();
      }
    });

    this.usuarioSer.getLogros(this.usuario).subscribe({
      next: (logros) => {
        this.logros = logros;
        this.cdr.detectChanges();
      }
    });
  }
}

