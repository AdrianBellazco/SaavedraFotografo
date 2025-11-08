import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent {
  calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, googleCalendarPlugin],
    initialView: 'dayGridMonth',
    height: 'auto',
    contentHeight: 650,

    // 🔹 Configura tu calendario de Google
    googleCalendarApiKey: 'AIzaSyD6pZJv3i0rpjLoJjLSVf3jE988kY6ReIY',
    events: {
      googleCalendarId: 'c0bb7ba0b6fc621d07a4a5babf0d15a3b110128a13120dc88916a2b0e9836e34@group.calendar.google.com'
    },

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
  };
}
