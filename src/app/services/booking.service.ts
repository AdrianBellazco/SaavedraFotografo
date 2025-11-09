import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private baseUrl = environment.apiBase;

  constructor(private http: HttpClient) {}

  async createBooking(payload: {
    sessionId: string;
    currency: string;
    totalAmount: number;
    itemsJson: string;
    appointmentDate: string; // ISO
  }): Promise<{ id?: number; error?: string }> {
    return await firstValueFrom(
      this.http.post<{ id?: number; error?: string }>(`${this.baseUrl}/bookings`, payload)
    );
  }
}
