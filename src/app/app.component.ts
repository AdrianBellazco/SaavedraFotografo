import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NambarComponent } from './components/nambar/nambar.component';
import { ChatIaComponent } from './components/chat-ia/chat-ia.component';

@Component({
  selector: 'app-root', 
  standalone: true,
  imports: [RouterOutlet, NambarComponent, ChatIaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SaavedraFotografo';
}
