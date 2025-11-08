<<<<<<< HEAD
// src/app/ai/ai.config.ts
import { BRAND } from './brand.config';
import { PAQUETES } from '../data/paquetes';
import { ESTRATEGIAS, EstrategiasSugerencia } from './suggestions.config';

// Usamos el mismo tipo inline para no importar Modo
type Modo = 'asesor' | 'ventas';

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

export const buildSystemPrompt = (modo?: Modo): string => {
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

ESTILO Y TONO:
- Lenguaje natural, cálido y profesional; frases cortas y claras.
- Evita sonar robótico o didáctico; nunca digas que eres un modelo de IA.
- Tutea (cuando sea apropiado) y mantén cercanía sin perder formalidad.
- Usa emojis sólo si aportan calidez (máx. 1).

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
=======
/* ============================================================================
 * ai.config.ts (versión tolerante de firma)
 * Construye el "system prompt" de Lumi con el catálogo actualizado.
 * Acepta llamadas antiguas como buildSystemPrompt(this.modo, this.persona)
 * y las ignora con seguridad (usa BRAND y PAQUETES por defecto).
 * ========================================================================== */

import { BRAND } from './brand.config';
import { PAQUETES, Paquete } from '../data/paquetes';
import { ESTRATEGIAS } from './suggestions.config';

/** Sanitiza texto para el prompt */
function normalize(text: string): string {
  return String(text ?? '')
    .replace(/\r/g, '')
    .replace(/\t/g, ' ')
    .replace(/[ ]{2,}/g, ' ')
    .trim();
}

/** Formatea precio COP legible */
function fmtCOP(value: number | undefined): string {
  if (typeof value !== 'number' || isNaN(value)) return 'N/D';
  return `$${value.toLocaleString('es-CO')}`;
}

/** Serializa un paquete al objeto que verá el modelo */
function serializePaquete(p: Paquete): any {
  const base: any = {
    id: p.id,
    nombre: p.nombre,
    categoria: p.categoria,
    modalidad: p.modalidad, // 'por_fotos' | 'por_horas'
    photobook: p.photobook ? 'sí' : 'no',
    precio_COP: p.precioCOP,
    precio_COP_str: fmtCOP(p.precioCOP),
    tags: p.tags ?? []
  };

  if (p.modalidad === 'por_horas') {
    base.horas = typeof p.horas === 'number' ? p.horas : undefined;
  } else if (p.modalidad === 'por_fotos') {
    base.tomas = typeof p.tomas === 'number' ? p.tomas : undefined;
  }

  base.incluye = (p.incluye ?? []).map((i: string) => normalize(i));
  if (p.regalos?.length) base.regalos = p.regalos.map((r: string) => normalize(r));
  if (p.notas?.length) base.notas = p.notas.map((n: string) => normalize(n));

  return base;
}

/** groupBy simple */
function groupBy<T, K extends string | number>(
  arr: T[],
  keyFn: (x: T) => K
): Record<K, T[]> {
  return arr.reduce((acc, item) => {
    const k = keyFn(item);
    (acc[k] ||= []).push(item);
    return acc;
  }, {} as Record<K, T[]>);
}

/** Crea un catálogo estructurado para el prompt */
function buildCatalogo(paquetes: Paquete[]) {
  const porCategoria = groupBy(paquetes, (p) => p.categoria);
  const resultado: Record<string, any> = {};

  Object.entries(porCategoria).forEach(([categoria, items]) => {
    const porModalidad = groupBy(items, (p) => p.modalidad);
    const cat: Record<string, any[]> = {};

    Object.entries(porModalidad).forEach(([modalidad, lista]) => {
      const conPB = lista.filter((p) => p.photobook);
      const sinPB = lista.filter((p) => !p.photobook);
      const serializeList = (L: Paquete[]) => L.map((p: Paquete) => serializePaquete(p));

      if (categoria === 'Productos' || categoria === 'Personales/Familiares') {
        cat[modalidad] = serializeList(lista);
      } else {
        cat[`${modalidad}__sin_photobook`] = serializeList(sinPB);
        cat[`${modalidad}__con_photobook`] = serializeList(conPB);
      }
    });

    resultado[categoria] = cat;
  });

  return resultado;
}

/** Políticas y tono de marca para el prompt */
function buildBrandPolicy(): string {
  const politicas = [
    `Marca: ${BRAND.nombre}`,
    `Ciudad base: ${BRAND.ubicacion?.ciudad ?? 'N/D'}`,
    `Cobertura: ${BRAND.ubicacion?.cobertura?.join(', ') ?? 'N/D'}`,
    `Tono: ${BRAND.tono?.join(', ') ?? 'profesional, cercano'}`,
    `Canales: ${BRAND.canales?.join(', ') ?? 'WhatsApp, Instagram'}`,
    `Entrega digital: ${BRAND.politicas?.entregaDigital ?? 'Sí'}`,
    `Tiempo de entrega: ${BRAND.politicas?.tiemposEntrega ?? 'Acorde a paquete'}`,
    `Reagendación: ${BRAND.politicas?.reagendacion ?? 'Flexible con aviso'}`,
    `Viáticos: ${BRAND.politicas?.viaticos ?? 'Se cotizan si hay desplazamiento'}`
  ];
  return politicas.map((l) => `- ${normalize(l)}`).join('\n');
}

/** Resumen de reglas de recomendación */
function buildEstrategiasResumen(): string {
  const rules: string[] = [];

  try {
    if (Array.isArray(ESTRATEGIAS?.prioridades)) {
      rules.push(`Prioridades de recomendación:`);
      ESTRATEGIAS.prioridades.forEach((r: any, idx: number) => {
        rules.push(
          `  ${idx + 1}. ${normalize(r?.descripcion ?? 'Regla sin descripción')} (${(r?.tags ?? []).join(', ')})`
        );
      });
    }
    if (typeof ESTRATEGIAS?.maxOpciones === 'number') {
      rules.push(`Máximo de alternativas a mostrar: ${ESTRATEGIAS.maxOpciones}`);
    }
    if (Array.isArray(ESTRATEGIAS?.diagnostico?.preguntas)) {
      rules.push(`Preguntas de diagnóstico sugeridas:`);
      ESTRATEGIAS.diagnostico.preguntas.forEach((q: string) => {
        rules.push(`  - ${normalize(q)}`);
      });
    }
  } catch {
    rules.push(`(No se pudieron leer estrategias; usar criterio por precio/ajuste.)`);
  }

  return rules.join('\n');
}

/* ============================================================================
 * Firma FLEXIBLE para compatibilidad retro:
 * - buildSystemPrompt()                            -> usa BRAND y PAQUETES
 * - buildSystemPrompt(modo, persona)               -> ignora y usa BRAND/PAQUETES
 * - buildSystemPrompt(brandLike, paquetesLike)     -> si detecta estructura de brand/paquetes, la usa
 * ========================================================================== */
export function buildSystemPrompt(
  arg1?: unknown,
  arg2?: unknown
): string {
  // Defaults
  let brand = BRAND;
  let paquetes: Paquete[] = PAQUETES;

  // Si el primer arg se parece a BRAND (tiene 'nombre' y 'politicas'), úsalo
  const b = arg1 as any;
  if (b && typeof b === 'object' && 'nombre' in b && 'politicas' in b) {
    brand = b as typeof BRAND;
  }

  // Si el segundo arg parece un array de paquetes (tiene objetos con 'id' y 'precioCOP'), úsalo
  const p = arg2 as any;
  if (Array.isArray(p) && p.length && typeof p[0] === 'object' && 'id' in p[0] && 'precioCOP' in p[0]) {
    paquetes = p as Paquete[];
  }

  const catalogo = buildCatalogo(paquetes);

  const prompt = `
Eres "Lumi", asistente de ${normalize(brand.nombre)}. Tu objetivo es recomendar
el paquete fotográfico que mejor se ajuste a la necesidad del cliente,
usando ÚNICAMENTE el catálogo proporcionado más abajo.

### Políticas y tono de marca
${buildBrandPolicy()}

### Reglas de recomendación
${buildEstrategiasResumen()}

### Catálogo (estructurado)
${JSON.stringify(catalogo, null, 2)}

### Instrucciones de respuesta
- Pregunta lo mínimo necesario si falta información crítica (horas, tomas, photobook sí/no, presupuesto).
- Ofrece entre 1 y 3 opciones ordenadas por ajuste (requisito → presupuesto → valor agregado).
- Para cada opción incluye: Nombre, ID, modalidad (por horas/fotos), horas o tomas, photobook sí/no, precio, "incluye", y regalos/notas relevantes.
- Si una opción excede levemente el presupuesto (≤ 5%), puedes señalarla como "estirar presupuesto".
- NUNCA inventes paquetes fuera del catálogo. Si algo no existe, dilo con claridad.
- Sé breve y claro, usa listas o tablas cuando el usuario lo pida o cuando facilite la lectura.
  `;
  return normalize(prompt);
}
>>>>>>> master
