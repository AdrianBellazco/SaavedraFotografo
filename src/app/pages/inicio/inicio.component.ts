import { Component } from '@angular/core';
import { NambarComponent } from '../../components/nambar/nambar.component';
import { RuletaComponent } from '../../components/ruleta/ruleta.component';
import { CardsComponent } from '../../components/cards/cards.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [NambarComponent, RuletaComponent, CardsComponent],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  currentYear: number = new Date().getFullYear();
}
