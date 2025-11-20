import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import {
  AiMessage,
  AiRequest,
  AiResponse,
  AnalyzeClientSafe
} from './ai.models';

import { Observable, of } from 'rxjs';
import { map, tap, switchMap, catchError } from 'rxjs/operators';

import { PAQUETES } from '../data/paquetes';

/* ===========================================================
   Simplificación de paquete para Stripe
   =========================================================== */
interface PaqueteStripe {
  nombre: string;
  amount: number;
  aliases?: string[];
}

@Injectable({ providedIn: 'root' })
export class AiService {
  private http = inject(HttpClient);

  private baseUrl = environment.openrouter.apiBase;
  private backendBase = 'http://localhost:8080';

  /* Convertimos catálogo a formato Stripe */
  private paquetes: PaqueteStripe[] = PAQUETES.map(p => ({
    nombre: p.nombre,
    amount: p.precioCOP,
    aliases: p.tags ?? []
  }));

  /* ===========================================================
     DETECTOR DE PAQUETE
     =========================================================== */
  private detectarPaquete(text: string): PaqueteStripe | null {
    if (!text) return null;
    const lower = text.toLowerCase();

    for (const p of this.paquetes) {
      if (lower.includes(p.nombre.toLowerCase())) return p;
    }

    for (const p of this.paquetes) {
      for (const t of p.aliases ?? []) {
        if (lower.includes(t.toLowerCase())) return p;
      }
    }

    return null;
  }

  /* ===========================================================
     INTENCIÓN DE COMPRA (nuevo)
     =========================================================== */
  private esIntencionDePago(text: string): boolean {
    if (!text) return false;

    const t = text.toLowerCase().trim();

    const triggers = [
      'sii', 'sí', 'si quiero', 'quiero ese', 'lo compro',
      'quiero comprar', 'quiero pagar', 'pagar', 'dale', 
      'hagámosle', 'hagamosle', 'me sirve', 'perfecto lo quiero',
      'quiero el de', 'estoy lista', 'estoy listo', 'listo', 'lista',
      'si quiero ese', 'si quiero el de'
    ];

    return triggers.some(k => t.includes(k));
  }

  /* ===========================================================
     CREAR CHECKOUT STRIPE
     =========================================================== */
  private crearCheckoutStripe(paquete: PaqueteStripe): Observable<string | null> {
    const body = {
      items: [{ name: paquete.nombre, amount: paquete.amount }],
      currency: 'usd',
      successUrl: "http://localhost:4200/calendario?success=true",
      cancelUrl: "http://localhost:4200/carrito?canceled=true"
    };

    const endpoint = `${this.backendBase}/api/payments/create-checkout-session`;

    return this.http.post<any>(endpoint, body).pipe(
      map(r => r?.url ?? null),
      catchError(err => {
        console.error('[crearCheckoutStripe] ERROR:', err);
        return of(null);
      })
    );
  }

  /* ===========================================================
     CHAT PRINCIPAL
     =========================================================== */
  chatComplete(
    messages: AiMessage[],
    model: string = environment.openrouter.defaultModel ?? 'openai/gpt-4o-mini',
    temperature: number = 0.5
  ): Observable<AiResponse> {

    /* ----------------------------------------------
       1) Detectamos intención ANTES de enviar al modelo
       ---------------------------------------------- */
    const ultimoUser = messages[messages.length - 1];
    let mensajes = [...messages];

    if (ultimoUser.role === 'user' && this.esIntencionDePago(ultimoUser.content)) {
      mensajes.push({
        role: "system",
        content: "<<GENERAR_LINK>>"
      });
    }

    /* ----------------------------------------------
       2) Hacemos request a OpenRouter
       ---------------------------------------------- */
    const body: AiRequest = { model, messages: mensajes, temperature, stream: false };
    const url = `${this.baseUrl}/chat`;

    return this.http.post<AiResponse>(url, body).pipe(
      tap({
        next: () => console.log('[AiService.chatComplete] OK'),
        error: (e) => console.error('[AiService.chatComplete] ERROR', e)
      }),

      switchMap((resp) => {
        const text = resp?.choices?.[0]?.message?.content ?? '';
        const msg = resp?.choices?.[0]?.message;
        if (!msg) return of(resp);

        const debeGenerar = text.includes('<<GENERAR_LINK>>');
        msg.content = text.replace('<<GENERAR_LINK>>', '').trim();

        if (!debeGenerar) return of(resp);

        const paquete = this.detectarPaquete(text);
        if (!paquete) {
          msg.content += `\n\n⚠️ No pude identificar el paquete para generar el pago.`;
          return of(resp);
        }

        return this.crearCheckoutStripe(paquete).pipe(
          map((urlStripe) => {
            if (urlStripe) {
              msg.content += `\n\n👉 **Pago seguro aquí:**\n${urlStripe}`;
            } else {
              msg.content += `\n\n⚠️ No se pudo generar el enlace de pago.`;
            }
            return resp;
          }),
          catchError(err => {
            console.error('[Stripe] ERROR:', err);
            msg.content += `\n\n⚠️ Error generando link de pago.`;
            return of(resp);
          })
        );
      })
    );
  }

  /* ===========================================================
     ANALYZER
     =========================================================== */
  analyzeClient(
    description: string,
    model: string = environment.openrouter.defaultModel ?? 'openai/gpt-4o-mini',
    temperature: number = 0.4
  ): Observable<AnalyzeClientSafe> {

    const system = `Actúas como un asistente experto en fotografía.
Devuelve SIEMPRE JSON válido:
{
  "tipoSesion": "string",
  "locaciones": ["string"],
  "vestuario": ["string"],
  "estilo": "string",
  "lente": "string"
}`;

    const user = `Analiza:\n${description}`;

    const body: AiRequest = {
      model,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user }
      ],
      stream: false,
      temperature,
      response_format: { type: 'json_object' }
    };

    return this.http.post<AiResponse>(`${this.baseUrl}/chat`, body).pipe(
      map((resp) => {
        const raw = resp?.choices?.[0]?.message?.content ?? '';
        try { return JSON.parse(raw); }
        catch { return { texto: raw }; }
      })
    );
  }
}
