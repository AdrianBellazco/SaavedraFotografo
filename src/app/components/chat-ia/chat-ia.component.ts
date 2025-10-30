import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService } from '../../ai/ai.service';
import { AiMessage } from '../../ai/ai.models';
import { AI_DEFAULT_SYSTEM_PROMPT } from '../../ai/ai.config';

@Component({
  selector: 'app-chat-ia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-ia.component.html',
  styleUrls: ['./chat-ia.component.css']
})
export class ChatIaComponent {
  private ai = inject(AiService);

  mostrarChat = true;
  input = '';
  loading = false;

  messages: AiMessage[] = [
    { role: 'system', content: AI_DEFAULT_SYSTEM_PROMPT },
    { role: 'assistant', content: '¡Hola! Soy tu asistente de fotografía. ¿En qué te ayudo hoy?' }
  ];

  toggleChat() { this.mostrarChat = !this.mostrarChat; }

  send() {
    const content = this.input.trim();
    if (!content || this.loading) return;

    this.messages.push({ role: 'user', content });
    this.input = '';
    this.loading = true;

    this.ai.chatComplete(this.messages).subscribe({
      next: (r) => {
        const text = r?.choices?.[0]?.message?.content ?? '(sin contenido)';
        this.messages.push({ role: 'assistant', content: text });
        this.loading = false;
        setTimeout(() => this.scrollToBottom(), 0);
      },
      error: (e) => {
        console.error(e);
        this.messages.push({ role: 'assistant', content: 'Ocurrió un error al conectarme con la IA.' });
        this.loading = false;
      }
    });
  }

  private scrollToBottom() {
    const el = document.querySelector('.chat-ia-window .log') as HTMLElement | null;
    if (el) el.scrollTop = el.scrollHeight;
  }
}
