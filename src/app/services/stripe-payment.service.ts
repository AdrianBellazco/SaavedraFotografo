import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

interface CreatePaymentIntentResponse {
  clientSecret: string;
  error?: string;
}

interface CreateCheckoutSessionResponse {
  id?: string;
  url?: string;
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class StripePaymentService {
  private baseUrl = environment.apiBase;

  constructor(private http: HttpClient) {}

  async createPaymentIntent(amountInCents: number, currency: string = 'usd'): Promise<CreatePaymentIntentResponse> {
    return await firstValueFrom(
      this.http.post<CreatePaymentIntentResponse>(`${this.baseUrl}/payments/create-payment-intent`, {
        amount: amountInCents,
        currency
      })
    );
  }

  async createCheckoutSession(items: { name: string; amount: number }[], currency: string = 'usd'): Promise<CreateCheckoutSessionResponse> {
    // Añadimos el placeholder para que el backend lo respete si lo usa directamente
  const successUrl = window.location.origin + '/calendario?success=true&session_id={CHECKOUT_SESSION_ID}';
    const cancelUrl = window.location.origin + '/carrito?canceled=true';
    return await firstValueFrom(
      this.http.post<CreateCheckoutSessionResponse>(`${this.baseUrl}/payments/create-checkout-session`, {
        items,
        currency,
        successUrl,
        cancelUrl
      })
    );
  }
}
