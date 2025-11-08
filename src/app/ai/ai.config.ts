// src/app/ai/ai.config.ts
import { BRAND } from './brand.config';
import { PAQUETES } from '../data/paquetes';
import { ESTRATEGIAS, EstrategiasSugerencia } from './suggestions.config';

// Tipos inline para evitar imports problemáticos
type Modo = 'asesor' | 'ventas';
type Persona = 'neutral' | 'romantico' | 'editorial' | 'comercial';

const ASISTENTE_NOMBRE = 'Lumi';

const estrategiasToText = (e: EstrategiasSugerencia): string => {
  const generales = `
- Modo de interacción actual: ${e.modo.toUpperCase()}
- Diagnóstico previo: ${e.generales.siempreDiagnosticar ? 'OBLIGATORIO' : 'Opcional'}
- Preguntas de diagnóstico (orden sugerido): ${e.generales.preguntasDiagnostico.join(' | ')}
- Ofrecer alternativa: ${e.generales.siempreOfrecerAlternativa ? 'Sí' : 'No'}
- Mostrar precios: ${e.generales.mostrarPrecios}
  `.trim();

  const porTipo = Object.entries(e.porTipo).map(([tipo, cfg]) => {
    return `> ${tipo}:
  - Prioridad paquetes: ${cfg.prioridadPaquetes.join(', ')}
  - Upsell preferido: ${cfg.upsellAddons?.join(', ') || 'N/A'}
  - Máx. opciones por defecto: ${cfg.maxOpcionesMostrar}
  - Notas: ${cfg.notas ?? '—'}`;
  }).join('\n');

  return `${generales}\n${porTipo}`;
};

function personaRules(persona: Persona): string {
  switch (persona) {
    case 'romantico':
      return `Matiz romántico y cálido; metáforas suaves; puedes usar un emoji floral 🌸 si aporta calidez. Evita exagerar.`;
    case 'editorial':
      return `Estilo elegante/editorial; vocabulario sobrio; evita emojis; resalta dirección de arte y estética cuidada.`;
    case 'comercial':
      return `Estilo directo y energético; frases breves orientadas a conversión; puedes usar un emoji puntual ✅.`;
    default:
      return `Tono profesional y cercano, natural; emojis solo si aportan (máx. 1).`;
  }
}

export const buildSystemPrompt = (modo?: Modo, persona: Persona = 'neutral'): string => {
  const active: EstrategiasSugerencia = { ...ESTRATEGIAS, modo: modo ?? ESTRATEGIAS.modo };

  const catalogo = JSON.stringify(
    PAQUETES.map(p => ({
      id: p.id,
      nombre: p.nombre,
      tipo: p.tipo,
      precio_COP: p.precio,
      duracion_min: p.duracionMin,
      fotos_entregadas: p.fotosEntregadas > 0 ? p.fotosEntregadas : 'todas',
      incluye: p.incluye,
      entrega: p.entrega,
      addOns: p.addOns?.map(a => ({ nombre: a.nombre, precio_COP: a.precio }))
    })),
    null,
    2
  );

  const politicas = `- Reserva: ${BRAND.politicas.reserva}
- Anticipo: ${BRAND.politicas.anticipo}
- Cancelación: ${BRAND.politicas.cancelacion}
- Extras: ${BRAND.politicas.extras.join('; ')}`;

  const estrategiaTexto = estrategiasToText(active);

  return `
Tu nombre es **${ASISTENTE_NOMBRE}** y actúas como asesor de **${BRAND.nombre}** (ubicación: ${BRAND.ubicacion}).

ESTILO Y TONO (personalidad = ${persona.toUpperCase()}):
- ${personaRules(persona)}
- Frases cortas y claras. No digas que eres un modelo de IA.

DINÁMICA DE CONVERSACIÓN:
- Comienza entendiendo objetivo, estilo, fecha/lugar, nº de personas y presupuesto.
- Resume lo entendido en 1 línea; luego sugiere opciones.
- Propón 1–2 paquetes (según estrategia) con precios e incluye 1 add-on relevante como sugerencia opcional.
- Cierra con una acción concreta (reservar, confirmar fecha, ajustar presupuesto, etc.).

POLÍTICAS Y OPERATIVA:
${politicas}
Atención: ${BRAND.horariosAtencion}
Zonas de servicio: ${BRAND.zonasServicio.join(', ')}
Tiempos de entrega: ${BRAND.tiemposEntrega}
Canales de contacto: ${BRAND.canalesContacto.join(', ')}

ESTRATEGIA DE SUGERENCIAS (guía interna):
${estrategiaTexto}

REGLAS CRÍTICAS:
1) Cotiza y sugiere **exclusivamente** con los paquetes y add-ons del catálogo (COP).
2) Si el cliente pide algo fuera del catálogo, indica que se cotiza aparte y pide datos (tipo, locación, tiempo, estilo, fecha/lugar).
3) Diagnostica con las preguntas listadas antes de sugerir, salvo que ya haya información.
4) No inventes precios; no uses referencias externas.
5) Respuestas claras, con bullets y próxima acción.

CATÁLOGO_JSON (interno; no lo muestres completo salvo que lo pidan):
${catalogo}
`;
};
