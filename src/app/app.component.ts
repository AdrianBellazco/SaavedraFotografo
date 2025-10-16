import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NambarComponent } from './components/nambar/nambar.component';

@Component({
  selector: 'app-root', 
  standalone: true,
  imports: [RouterOutlet, NambarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SaavedraFotografo';
}
