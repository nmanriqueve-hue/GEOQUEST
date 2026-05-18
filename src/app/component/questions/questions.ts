import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PartidaService } from '../../service/partida.service';
import { AuthService } from '../../service/auth.service';
import { PartidaDTO, PreguntaDTO } from '../../model/partida.model';


interface OpcionUI {
  texto: string;
  esCorrecta: boolean;
  codigoIso?: string;
}
type FeedbackEstado = 'idle' | 'correcto' | 'incorrecto';


@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './questions.html',
  styleUrls: ['./questions.css'],
})


export class Questions implements OnInit {

  partida!: PartidaDTO;
  cargando = true;
  tiempoRestante = 30;
  private timerInterval: any;


  preguntaActual = 0;
  puntajeActumulado = 0;
  respuestasCorrectas = 0;
  juegoTerminado = false;


  opciones: OpcionUI[] = [];
  opcionSeleccionada: number | null = null;
  feedbackEstado: FeedbackEstado = 'idle';
  feedbackMensaje = '';


  private categoriaNombres: Record<number, string> = {
    1: 'Capitals', 2: 'Flags', 3: 'Language',
    4: 'Calling Codes', 5: 'Currencies',
    6: 'Continents', 7: 'Population', 8: 'All'
  };

  private dificultadNombres: Record<number, string> = {
    1: 'Easy', 2: 'Medium', 3: 'Hard'
  };

  tituloQuiz = 'Quiz';


  username = '';
  constructor(
    private partidaService: PartidaService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}


  ngOnInit(): void {
    const username = this.authService.getNombreDesdeToken()!;
    const categoria = this.route.snapshot.paramMap.get('id');
    const dificultad = this.route.snapshot.paramMap.get('nivel');
    console.log('Iniciando partida...');
    let peticion;

    if (categoria) {
      const cat = Number(categoria);
      this.tituloQuiz = this.categoriaNombres[cat] ?? 'Quiz';
      peticion = this.partidaService.iniciarPartidaCategoria(cat, username);
    } else {
      const niv = Number(dificultad);
      this.tituloQuiz = this.dificultadNombres[niv] ?? 'Quiz';
      peticion = this.partidaService.iniciarPartidaDificultad(niv, username);
    }

    peticion.subscribe({
      next: (data) => {
        this.partida = data;
        this.cargarPregunta();
        this.cargando = false;
        this.iniciarTimer();
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }



  get pregunta(): PreguntaDTO | undefined {
    return this.partida?.preguntas?.[this.preguntaActual];
  }

  get totalPreguntas(): number {
    return this.partida?.preguntas?.length ?? 0;
  }

  get progreso(): string {
    if (!this.totalPreguntas) return '0%';
    return `${Math.round((this.preguntaActual / this.totalPreguntas) * 100)}%`;
  }

  get enunciadoTexto(): string {
    return this.pregunta?.enunciado?.replace(/\{.*?\}/g, '').trim() ?? '';
  }

  get enunciadoImagen(): string | null {
    const match = this.pregunta?.enunciado?.match(/\{(.*?)\}/);
    return match ? match[1] : null;
  }

  get etiquetaResultado(): string {
    const ratio = this.respuestasCorrectas / this.totalPreguntas;
    if (ratio >= 0.9) return '🏆 Outstanding!';
    if (ratio >= 0.7) return '⭐ Great job!';
    if (ratio >= 0.5) return '👍 Not bad!';
    return 'Keep practising!';
  }



  private cargarPregunta(): void {
    this.feedbackEstado = 'idle';
    this.feedbackMensaje = '';
    this.opcionSeleccionada = null;

    const pregunta = this.partida.preguntas[this.preguntaActual];

    // Usar directamente las respuestas del backend y shufflearlas
    this.opciones = this.shuffleArray(
      pregunta.respuesta.map((r) => ({
        texto: r.enunciado,
        esCorrecta: r.esCorrecta,
      })),
    );
  }



  seleccionarOpcion(idx: number): void {
    if (this.feedbackEstado !== 'idle') return;

    this.opcionSeleccionada = idx;
    const opcion = this.opciones[idx];
    const preguntaActual = this.partida.preguntas[this.preguntaActual];

    if (opcion.esCorrecta) {
      this.feedbackEstado = 'correcto';
      this.feedbackMensaje = '✔ Correct!';
      this.respuestasCorrectas++;

      const puntosDificultad = Math.max(1, Math.round(preguntaActual.dificultad / 10));
      const bonusTiempo = Math.round(this.tiempoRestante / 3);
      const puntos = puntosDificultad + bonusTiempo;

      this.puntajeActumulado += puntos;
      this.detenerTimer();

    } else {
      this.feedbackEstado = 'incorrecto';
      this.detenerTimer();
      const correctaTexto = this.opciones.find((o) => o.esCorrecta)?.texto ?? '';
      this.feedbackMensaje = `✘ Wrong. The answer was: ${correctaTexto}`;
    }
  }
  siguientePregunta(): void {
    if (this.feedbackEstado === 'idle') return; // must answer first

    if (this.preguntaActual < this.totalPreguntas - 1) {
      this.preguntaActual++;
      this.cargarPregunta();
      this.iniciarTimer();
    } else {
      this.partidaService.finalizarPartida(
        this.partida.idPartida,
        this.respuestasCorrectas,
        this.puntajeActumulado
      ).subscribe({
        next: () => console.log('Partida guardada'),
        error: (err) => console.error('Error guardando partida:', err)
      });
      this.juegoTerminado = true;
    }
  }

  reiniciar(): void {
    this.preguntaActual = 0;
    this.puntajeActumulado = 0;
    this.respuestasCorrectas = 0;
    this.juegoTerminado = false;
    this.cargarPregunta();
  }


  private shuffleArray<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  claseOpcion(idx: number): string {
    if (this.feedbackEstado === 'idle') return 'option-btn';
    if (this.opciones[idx].esCorrecta) return 'option-btn correcto';
    if (idx === this.opcionSeleccionada) return 'option-btn incorrecto';
    return 'option-btn dimmed';
  }

  get dificultadLabel(): string {
    if (!this.pregunta) return '';
    if (this.pregunta.dificultad >= 70) return '🔥 Hard';
    if (this.pregunta.dificultad >= 40) return '⚡ Medium';
    return '🌱 Easy';
  }

  private iniciarTimer(): void {
    this.tiempoRestante = 30;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    this.timerInterval = setInterval(() => {
      this.tiempoRestante--;
      this.cdr.detectChanges();

      if (this.tiempoRestante <= 0) {
        clearInterval(this.timerInterval);
        // tiempo agotado — marcar como incorrecta
        this.feedbackEstado = 'incorrecto';
        this.feedbackMensaje = '⏰ Time is up!';
        this.cdr.detectChanges();
      }
    }, 1000);
  }

  private detenerTimer(): void {
    clearInterval(this.timerInterval);
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }
}
