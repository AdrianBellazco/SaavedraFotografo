import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AiMessage, AiRequest, AiResponse } from './ai.models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AiService {
  private http = inject(HttpClient);
  private baseUrl: string = environment.openrouter.apiBase;

  chatComplete(
    messages: AiMessage[],
    model: string = environment.openrouter.defaultModel ?? 'openai/gpt-4o-mini',
    temperature: number = 0.5
  ): Observable<AiResponse> {
    const body: AiRequest = { model, messages, temperature, stream: false };
    const url = `${this.baseUrl}/chat`;
    return this.http.post<AiResponse>(url, body);
  }
}
