<<<<<<< HEAD
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
=======
/* ============================================================================
 * brand.config.ts
 * Datos de marca que se muestran en el system prompt y reglas del negocio.
 * Debe alinear los nombres de propiedades con ai.config.ts
 * ========================================================================== */

export interface Politicas {
  entregaDigital: string;   // Ej: "Sí, por link privado"
  tiemposEntrega: string;   // Ej: "3–7 días hábiles según paquete"
  reagendacion: string;     // Ej: "Flexible con 48h de antelación"
  viaticos: string;         // Ej: "Se cotizan si hay desplazamiento"
}

export interface Ubicacion {
  ciudad: string;           // Ej: "Tuluá"
  cobertura: string[];      // Ej: ["Tuluá", "Buga", "Zarzal", "Cali"]
}

export interface MarcaConfig {
  nombre: string;           // Ej: "SaavedraFotógrafo"
  tono: string[];           // Ej: ["profesional", "cercano", "claro"]
  canales: string[];        // Ej: ["WhatsApp", "Instagram"]
  ubicacion: Ubicacion;
  politicas: Politicas;
}

export const BRAND: MarcaConfig = {
  nombre: 'SaavedraFotógrafo',
  tono: ['profesional', 'cercano', 'claro'],
  canales: ['WhatsApp', 'Instagram'],
  ubicacion: {
    ciudad: 'Tuluá',
    cobertura: ['Tuluá', 'Buga', 'Zarzal', 'Cali']
  },
  politicas: {
    entregaDigital: 'Sí, por enlace privado (carpeta en la nube).',
    tiemposEntrega: '3–7 días hábiles según el paquete.',
    reagendacion: 'Flexible con 48h de antelación.',
    viaticos: 'Se cotizan si hay desplazamiento fuera de Tuluá.'
>>>>>>> master
  }
};
