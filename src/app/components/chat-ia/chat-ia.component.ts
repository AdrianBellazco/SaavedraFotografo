import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-chat-ia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-ia.component.html',
  styleUrls: ['./chat-ia.component.css']
})
export class ChatIaComponent {
  mostrarChat = false;

  toggleChat() {
    this.mostrarChat = !this.mostrarChat;
  }
}
