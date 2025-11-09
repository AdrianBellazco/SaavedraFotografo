// src/app/components/chat-ia/chat-ia.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService } from '../../ai/ai.service';
import { AiMessage } from '../../ai/ai.models';
import { buildSystemPrompt } from '../../ai/ai.config';
import { BRAND } from '../../ai/brand.config';

// Tipos locales
type Modo = 'asesor' | 'ventas';
type Persona = 'neutral' | 'romantico' | 'editorial' | 'comercial';

function saludoInicial(): string {
  const hora = new Date().getHours();
  if (hora < 12) return `☀️ ¡Buenos días! Soy Lumi, asistente virtual de ${BRAND.nombre}. ¿Qué tienes en mente para tu sesión? (fecha/lugar, estilo y presupuesto)`;
  if (hora < 19) return `🌇 ¡Buenas tardes! Soy Lumi, asistente virtual de ${BRAND.nombre}. Cuéntame tu idea (fecha/lugar, estilo y presupuesto) y te ayudo a armar la mejor opción.`;
  return `🌙 ¡Buenas noches! Soy Lumi, asistente virtual de ${BRAND.nombre}. ¿Qué te gustaría crear? (fecha/lugar, estilo y presupuesto)`;
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

  // Estado de estrategia y personalidad
  private modo: Modo = 'asesor';
  persona: Persona = 'neutral';

  private systemPrompt = buildSystemPrompt(this.modo, this.persona);

  // Mensajes: ocultaremos los 'system' en la vista
  messages: AiMessage[] = [
    { role: 'system', content: this.systemPrompt },
    { role: 'assistant', content: saludoInicial() }
  ];

  // Getter: solo mostramos user/assistant
  get visibleMessages(): AiMessage[] {
    return this.messages.filter(m => m.role !== 'system');
  }

  toggleChat() { this.mostrarChat = !this.mostrarChat; }

  private applyMode(newMode: Modo) {
    this.modo = newMode;
    this.reseedConversation();
  }

  private applyPersona(newPersona: Persona) {
    this.persona = newPersona;
    this.reseedConversation();
  }

  private reseedConversation() {
    this.systemPrompt = buildSystemPrompt(this.modo, this.persona);
    this.messages = [
      { role: 'system', content: this.systemPrompt },
      { role: 'assistant', content: saludoInicial() }
    ];
  }

  private handleCommand(raw: string): boolean {
    const cmd = raw.trim().toLowerCase();

    if (cmd === '/reset') {
      this.reseedConversation();
      return true;
    }

    if (cmd.startsWith('/modo')) {
      const m = cmd.replace('/modo', '').trim();
      if (m === 'asesor' || m === 'ventas') {
        this.applyMode(m as Modo);
      } else {
        this.messages.push({
          role: 'assistant',
          content: 'Modos disponibles: "asesor" o "ventas". Ejemplo: /modo ventas'
        });
      }
      return true;
    }

    if (cmd.startsWith('/personalidad') || cmd.startsWith('/persona')) {
      const p = cmd.replace('/personalidad', '').replace('/persona', '').trim();
      if (p === 'neutral' || p === 'romantico' || p === 'editorial' || p === 'comercial') {
        this.applyPersona(p as Persona);
      } else {
        this.messages.push({
          role: 'assistant',
          content: 'Personalidades: "neutral", "romantico", "editorial", "comercial". Ejemplo: /personalidad romantico'
        });
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

    // Mensaje del usuario
    this.messages.push({ role: 'user', content });
    this.input = '';
    this.loading = true;

    // Indicador "escribiendo…"
    this.messages.push({ role: 'assistant', content: '💬 Lumi está escribiendo…' });
    const typingIndex = this.messages.length - 1;

    this.ai.chatComplete(this.messages).subscribe({
      next: (r) => {
        const text = r?.choices?.[0]?.message?.content ?? '(sin contenido)';
        // Reemplaza el indicador por la respuesta real
        this.messages[typingIndex].content = text;
        this.loading = false;
        setTimeout(() => this.scrollToBottom(), 0);
      },
      error: (e) => {
        console.error(e);
        this.messages[typingIndex].content = 'Ocurrió un error al conectarme con la IA.';
        this.loading = false;
      }
    });
  }

  private scrollToBottom() {
    const el = document.querySelector('.chat-ia-window .log') as HTMLElement | null;
    if (el) el.scrollTop = el.scrollHeight;
  }
}
