// src/app/components/chat-ia/chat-ia.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService } from '../../ai/ai.service';
import { AiMessage } from '../../ai/ai.models';
import { buildSystemPrompt } from '../../ai/ai.config';
import { BRAND } from '../../ai/brand.config';

// Tipo local para evitar imports problemáticos
type Modo = 'asesor' | 'ventas';

function saludoInicial(): string {
  const hora = new Date().getHours();
  const saludo = hora < 12 ? '¡Buenos días!' : hora < 19 ? '¡Buenas tardes!' : '¡Buenas noches!';
  return `${saludo} Soy Lumi, asistente virtual de ${BRAND.nombre}. Cuéntame qué tienes en mente para tu sesión (fecha/lugar, estilo y presupuesto) y te ayudo a armar la mejor opción.`;
}

@Component({
  selector: 'app-chat-ia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-ia.component.html',
  styleUrls: ['./chat-ia.component.css']
})
export class ChatIaComponent {
  private ai = inject(AiService);

  mostrarChat = false;
  input = '';
  loading = false;

  private modo: Modo = 'asesor';
  private systemPrompt = buildSystemPrompt(this.modo);

  // IMPORTANTE: mantenemos el mensaje 'system' para el modelo, pero no lo mostraremos en la vista
  messages: AiMessage[] = [
    { role: 'system', content: this.systemPrompt },
    { role: 'assistant', content: saludoInicial() }
  ];

  // Getter para filtrar lo visible (oculta role: 'system')
  get visibleMessages(): AiMessage[] {
    return this.messages.filter(m => m.role !== 'system');
  }

  toggleChat() { this.mostrarChat = !this.mostrarChat; }

  private applyMode(newMode: Modo) {
    this.modo = newMode;
    this.systemPrompt = buildSystemPrompt(this.modo);
    this.messages = [
      { role: 'system', content: this.systemPrompt },
      { role: 'assistant', content: saludoInicial() }
    ];
  }

  private resetConversation() {
    this.systemPrompt = buildSystemPrompt(this.modo);
    this.messages = [
      { role: 'system', content: this.systemPrompt },
      { role: 'assistant', content: saludoInicial() }
    ];
  }

  private handleCommand(raw: string): boolean {
    const cmd = raw.trim().toLowerCase();
    if (cmd === '/reset') {
      this.resetConversation();
      return true;
    }
    if (cmd.startsWith('/modo')) {
      const m = cmd.replace('/modo', '').trim();
      if (m === 'asesor' || m === 'ventas') {
        this.applyMode(m as Modo);
      } else {
        this.messages.push({ role: 'assistant', content: 'Modos disponibles: "asesor" o "ventas". Ejemplo: /modo ventas' });
      }
      return true;
    }
    return false;
  }

  send() {
    const content = this.input.trim();
    if (!content || this.loading) return;

    if (this.handleCommand(content)) {
      this.input = '';
      return;
    }

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
