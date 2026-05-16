import { Component , Input} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-questions',
  imports: [RouterLink],
  templateUrl: './questions.html',
  styleUrl: './questions.css',
})
export class Questions {


  @Input() title: string = '';
}
