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
  }
};
