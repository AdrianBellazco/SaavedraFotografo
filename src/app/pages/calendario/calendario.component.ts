import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import interactionPlugin from '@fullcalendar/interaction';

interface CalendarEvent {
  title: string;
  start: string; // ISO
  allDay?: boolean;
  color?: string;
}

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, HttpClientModule, FormsModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  calendarOptions: any = {
    plugins: [dayGridPlugin, interactionPlugin, googleCalendarPlugin],
    initialView: 'dayGridMonth',
    height: 'auto',
    contentHeight: 650,

    // 🔹 Configura tu calendario de Google
    googleCalendarApiKey: 'AIzaSyD6pZJv3i0rpjLoJjLSVf3jE988kY6ReIY',
    events: [],

    displayEventTime: false,
    displayEventEnd: false,

    // 🔹 Forzar que los eventos se dibujen como bloques
    eventDisplay: 'block',
    eventClassNames: 'evento-bloque', // clase CSS personalizada
    eventClick: (info: any) => {
      info.jsEvent.preventDefault(); // bloquear clic
    },
    eventMouseEnter: (info: any) => {
      info.el.style.cursor = 'not-allowed'; // cursor bloqueado
    },

    // 🔹 Encabezado del calendario
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek'
    },
    dateClick: (arg: any) => this.dateClicked(arg)
  };

  sessionId: string | null = null;
  preItems: any[] = [];
  selectedDate: string = '';
  selectedTime: string = '';
  message: string = '';
  loading = false;
  alreadyBooked = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const params = new URLSearchParams(window.location.search);
    this.sessionId = params.get('session_id');
    // Recuperar ítems comprados
    const stored = localStorage.getItem('prePurchaseItems');
    if (stored) {
      try { this.preItems = JSON.parse(stored); } catch {}
    }
    this.loadBookedDates();
    this.checkSessionBooked();
  }

  async checkSessionBooked() {
    if (!this.sessionId) return;
    try {
      const resp: any = await this.http.get(`http://localhost:8080/api/bookings/by-session?sessionId=${this.sessionId}`).toPromise();
      // Si el backend devolvió un objeto Appointment directamente
      if (resp && resp.id) {
        this.alreadyBooked = true;
        this.message = 'Esta compra ya tiene una reserva creada (ID ' + resp.id + ')';
        localStorage.removeItem('prePurchaseItems');
      }
      // Si devolvió { booking: null } entonces no hay reserva
    } catch (e: any) {
      // fallar silenciosamente para no bloquear la UI
    }
  }

  async loadBookedDates() {
    this.loading = true;
    try {
      // Rango: hoy - 6 meses
      const from = new Date();
      const to = new Date();
      to.setMonth(to.getMonth() + 6);
      const fromIso = from.toISOString().slice(0,19);
      const toIso = to.toISOString().slice(0,19);
  const listResp = await this.http.get<any[]>(`http://localhost:8080/api/bookings?from=${fromIso}&to=${toIso}`).toPromise();
  const list: any[] = Array.isArray(listResp) ? listResp : [];
      const events: CalendarEvent[] = list.map(ap => ({
        title: 'Reservado',
        start: ap.appointmentDate,
        allDay: false,
        color: '#d9534f'
      }));
      this.calendarOptions.events = events;
      this.message = 'Selecciona fecha y hora disponibles';
    } catch (e: any) {
      this.message = 'Error cargando fechas';
    } finally {
      this.loading = false;
    }
  }

  dateClicked(arg: any) {
    // FullCalendar day clicks
    const dateStr = arg.dateStr; // YYYY-MM-DD
    this.selectedDate = dateStr;
  }

  async confirmarReserva() {
    if (!this.sessionId) {
      this.message = 'Session ID no disponible';
      return;
    }
    if (this.alreadyBooked) {
      this.message = 'Ya existe una reserva para esta compra';
      return;
    }
    if (!this.selectedDate || !this.selectedTime) {
      this.message = 'Selecciona fecha y hora';
      return;
    }
    const dateTimeIso = this.selectedDate + 'T' + this.selectedTime + ':00';
    // Validar disponibilidad exacta
    try {
      const avail: any = await this.http.get(`http://localhost:8080/api/bookings/available?date=${dateTimeIso}`).toPromise();
      if (!avail.available) {
        this.message = 'La fecha/hora ya está ocupada';
        return;
      }
      const totalAmount = this.preItems.reduce((s, i) => s + (i.precio || 0), 0);
      const body = {
        sessionId: this.sessionId,
        currency: 'cop',
        totalAmount,
        itemsJson: JSON.stringify(this.preItems),
        appointmentDate: dateTimeIso
      };
      const resp: any = await this.http.post('http://localhost:8080/api/bookings', body).toPromise();
      if (resp.error) {
        this.message = resp.error;
        return;
      }
      this.message = '✅ Reserva confirmada (ID ' + resp.id + ')';
      localStorage.removeItem('prePurchaseItems');
    } catch (e: any) {
      this.message = e?.message || 'Error guardando reserva';
    }
  }
}
