import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService } from '../../ai/ai.service';
import { AnalyzeClientSafe, AnalyzeClientResult } from '../../ai/ai.models';

@Component({
  selector: 'app-client-analyzer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-analyzer.component.html',
  styleUrls: ['./client-analyzer.component.css']
})
export class ClientAnalyzerComponent {
  private ai = inject(AiService);

  description = '';
  loading = false;
  result: AnalyzeClientSafe | null = null;
  errorMsg = '';

  analyze() {
    this.errorMsg = '';
    this.result = null;

    const text = this.description.trim();
    if (!text) return;

    this.loading = true;

    this.ai.analyzeClient(text).subscribe({
      next: (out) => {
        this.result = out;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'Ocurrió un error al conectar con la IA.';
        this.loading = false;
      }
    });
  }

  // ===== Helpers para la plantilla (type guards correctos) =====

  /** Devuelve true si r es el JSON esperado */
  isJson(r: AnalyzeClientSafe | null): r is AnalyzeClientResult {
    return !!r && typeof r === 'object' && !('texto' in (r as any));
  }

  /** Devuelve true si r es texto plano */
  isTexto(r: AnalyzeClientSafe | null): r is { texto: string } {
    return !!r && typeof r === 'object' && 'texto' in (r as any);
  }

  /** Cast seguro para usar en el template */
  asAny<T = any>(r: unknown): T {
    return r as T;
  }
}
