// src/app/ai/brand.config.ts
export interface Politicas {
  reserva: string;
  anticipo: string;
  cancelacion: string;
  extras: string[];
}

export interface MarcaConfig {
  nombre: string;
  ubicacion: string;
  moneda: 'COP';
  tono: string;
  estiloVenta: string;
  tiemposEntrega: string;
  canalesContacto: string[];
  horariosAtencion: string;
  politicas: Politicas;
  zonasServicio: string[];
}

export const BRAND: MarcaConfig = {
  nombre: 'SaavedraFotografo',
  ubicacion: 'Valle del Cauca, Colombia',
  moneda: 'COP',
  tono: 'Profesional, cercano, claro y honesto. Evita tecnicismos innecesarios.',
  estiloVenta: 'Consultivo: primero entiende la necesidad, luego sugiere el paquete más adecuado.',
  tiemposEntrega: 'Galería digital en 5 a 7 días hábiles (según carga de trabajo).',
  canalesContacto: ['WhatsApp', 'Instagram', 'Teléfono', 'Correo'],
  horariosAtencion: 'Lunes a sábado, 8:00 a.m. a 6:00 p.m.',
  zonasServicio: ['Tuluá', 'Buga', 'Cali', 'Jamundí', 'Palmira'],
  politicas: {
    reserva: 'Agenda sujeta a disponibilidad. La fecha se bloquea con anticipo.',
    anticipo: 'Anticipo del 30% para reservar la fecha.',
    cancelacion: 'Cancelación con 72 horas de antelación: se traslada la fecha sin penalidad. Menos de 72h: se retiene anticipo.',
    extras: [
      'Horas adicionales se cotizan aparte',
      'Desplazamientos fuera de zona se cotizan según distancia',
      'Ediciones extra o retoques avanzados se cotizan por foto'
    ]
  }
};
