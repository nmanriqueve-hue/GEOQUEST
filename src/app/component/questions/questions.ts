import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-questions',
  imports: [RouterLink],
  templateUrl: './questions.html',
  styleUrl: './questions.css',
})
export class Questions {

  @Input() title: string = '';

  dificultad: string = 'facil';

  config = {
    facil:   { totalPreguntas: 10, tiempoSegundos: 60, label: 'Easy 🟢'   },
    medio:   { totalPreguntas: 15, tiempoSegundos: 40, label: 'Medium 🟡'   },
    dificil: { totalPreguntas: 20, tiempoSegundos: 20, label: 'Hard 🔴' },
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const d = params['dificultad'];

      if (d === 'facil' || d === 'medio' || d === 'dificil') {
        this.dificultad = d;
      }

      if (!this.title) {
        this.title = this.config[this.dificultad as keyof typeof this.config].label;
      }
    });
  }

  get cfg() {
    return this.config[this.dificultad as keyof typeof this.config];
  }

}
