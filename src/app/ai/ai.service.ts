import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  AiMessage,
  AiRequest,
  AiResponse,
  AnalyzeClientSafe,
  AnalyzeClientResult
} from './ai.models';
import { Observable, map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AiService {
  private http = inject(HttpClient);
  private baseUrl = environment.openrouter.apiBase;

  /** Chat normal (NO streaming) */
  chatComplete(
    messages: AiMessage[],
    model: string = environment.openrouter.defaultModel ?? 'openai/gpt-4o-mini',
    temperature: number = 0.5
  ): Observable<AiResponse> {
    const body: AiRequest = { model, messages, temperature, stream: false };
    const url = `${this.baseUrl}/chat`;
    return this.http.post<AiResponse>(url, body).pipe(
      tap({
        next: (r) => console.log('[AiService.chatComplete] OK'),
        error: (e) => console.error('[AiService.chatComplete] ERROR', e)
      })
    );
  }

  /** Analizador de descripción de cliente (fuerza JSON si es posible) */
  analyzeClient(
    description: string,
    model: string = environment.openrouter.defaultModel ?? 'openai/gpt-4o-mini',
    temperature: number = 0.4
  ): Observable<AnalyzeClientSafe> {
    const system = `Actúas como un asistente experto en fotografía.
Devuelve SIEMPRE JSON válido con esta estructura:
{
  "tipoSesion": "string",
  "locaciones": ["string", "..."],
  "vestuario": ["string", "..."],
  "estilo": "string",
  "lente": "string"
}`;

    const user = `Analiza la siguiente descripción de cliente y llena el JSON.
Descripción:
${description}`;

    const body: AiRequest = {
      model,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user }
      ],
      temperature,
      stream: false,
      response_format: { type: 'json_object' } // <- clave para que intente JSON limpio
    };

    const url = `${this.baseUrl}/chat`;
    return this.http.post<AiResponse>(url, body).pipe(
      map((resp) => {
        const raw = resp?.choices?.[0]?.message?.content ?? '';
        try {
          const parsed = JSON.parse(raw) as AnalyzeClientResult;
          return {
            tipoSesion: parsed.tipoSesion ?? '',
            locaciones: parsed.locaciones ?? [],
            vestuario: parsed.vestuario ?? [],
            estilo: parsed.estilo ?? '',
            lente: parsed.lente ?? ''
          } satisfies AnalyzeClientResult;
        } catch {
          return { texto: raw } as AnalyzeClientSafe;
        }
      })
    );
  }
}
