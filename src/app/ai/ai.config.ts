/* ============================================================================
 * ai.config.ts – SUPER VERSIÓN INTELIGENTE Y TOLERANTE
 * Lumi ahora:
 *  - Entiende lenguaje fuerte sin confundirlo con una compra.
 *  - Usa intuición y contexto emocional.
 *  - Pide confirmación antes de marcar <<GENERAR_LINK>>.
 *  - Suena natural, humana, cálida y profesional.
 *  - Varía estructuras para evitar repetición.
 *  - Trabaja SOLO con los paquetes del catálogo.
 *  - NO muestra IDs al cliente.
 *  - Solo activa la marca de compra cuando REALMENTE debe.
 * ========================================================================== */

import { BRAND } from './brand.config';
import { PAQUETES, Paquete } from '../data/paquetes';
import { ESTRATEGIAS } from './suggestions.config';

/* ============================================================================
 * Utilidades
 * ========================================================================== */
function normalize(text: string): string {
  return String(text ?? '')
    .replace(/\r/g, '')
    .replace(/\t/g, ' ')
    .replace(/[ ]{2,}/g, ' ')
    .trim();
}

function fmtCOP(value: number | undefined): string {
  if (typeof value !== 'number') return 'N/D';
  return `$${value.toLocaleString('es-CO')}`;
}

function serializePaquete(p: Paquete): any {
  const o: any = {
    id: p.id,
    nombre: p.nombre,
    categoria: p.categoria,
    modalidad: p.modalidad,
    photobook: p.photobook ? 'sí' : 'no',
    precio_COP: p.precioCOP,
    precio_COP_str: fmtCOP(p.precioCOP),
    tags: p.tags ?? [],
    incluye: (p.incluye ?? []).map((i) => normalize(i)),
    notas: (p.notas ?? []).map((n) => normalize(n)),
    regalos: (p.regalos ?? []).map((n) => normalize(n)),
  };

  if (p.modalidad === 'por_fotos') o.tomas = p.tomas;
  if (p.modalidad === 'por_horas') o.horas = p.horas;

  return o;
}

function groupBy<T, K extends string | number>(
  arr: T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return arr.reduce((acc, item) => {
    const k = keyFn(item);
    (acc[k] ||= []).push(item);
    return acc;
  }, {} as Record<K, T[]>);
}

function buildCatalogo(paquetes: Paquete[]) {
  const porCategoria = groupBy(paquetes, (p) => p.categoria);
  const catalogo: any = {};

  for (const [cat, items] of Object.entries(porCategoria)) {
    const porModalidad = groupBy(items, (p) => p.modalidad);
    const bloque: any = {};

    for (const [modalidad, lista] of Object.entries(porModalidad)) {
      const conPB = lista.filter((p) => p.photobook);
      const sinPB = lista.filter((p) => !p.photobook);

      if (cat === 'Productos' || cat === 'Personales/Familiares') {
        bloque[modalidad] = lista.map((p) => serializePaquete(p));
      } else {
        bloque[`${modalidad}__con_photobook`] = conPB.map(serializePaquete);
        bloque[`${modalidad}__sin_photobook`] = sinPB.map(serializePaquete);
      }
    }

    catalogo[cat] = bloque;
  }

  return catalogo;
}

function buildBrandPolicy(): string {
  const b = BRAND;
  const listado = [
    `Marca: ${b.nombre}`,
    `Ciudad base: ${b.ubicacion?.ciudad ?? ''}`,
    `Cobertura: ${b.ubicacion?.cobertura?.join(', ')}`,
    `Tono: ${b.tono?.join(', ')}`,
    `Canales: ${b.canales?.join(', ')}`,
    `Entrega digital: ${b.politicas?.entregaDigital}`,
    `Tiempos de entrega: ${b.politicas?.tiemposEntrega}`,
    `Viáticos: ${b.politicas?.viaticos}`,
    `Reagendación: ${b.politicas?.reagendacion}`
  ];

  return listado.map((l) => `- ${normalize(l)}`).join('\n');
}

function buildEstrategias(): string {
  const e = ESTRATEGIAS;
  let out = `Reglas de recomendación:\n`;

  try {
    if (Array.isArray(e.prioridades)) {
      e.prioridades.forEach((r: any, idx: number) => {
        out += `  ${idx + 1}. ${normalize(r.descripcion)} (${(r.tags ?? []).join(', ')})\n`;
      });
    }
    out += `Máx alternativas: ${e.maxOpciones}\nPreguntas base:\n`;
    e.diagnostico?.preguntas?.forEach((q: string) => (out += ` - ${normalize(q)}\n`));
  } catch {
    out += `(no se pudo leer ESTRATEGIAS, usar criterio básico según necesidades del cliente)`;
  }

  return out;
}

/* ============================================================================
 * buildSystemPrompt – LUMI MASTER VERSION
 * ========================================================================== */
export function buildSystemPrompt(arg1?: any, arg2?: any): string {
  let brand = BRAND;
  let paquetes = PAQUETES;

  if (arg1 && typeof arg1 === 'object' && 'nombre' in arg1) brand = arg1;
  if (Array.isArray(arg2) && arg2.length && 'precioCOP' in arg2[0]) paquetes = arg2;

  const catalogo = buildCatalogo(paquetes);

  const prompt = `
Eres **Lumi**, asistente virtual de ${normalize(brand.nombre)}.
Tu misión es orientar al cliente con CALIDEZ, NATURALIDAD y CRITERIO PROFESIONAL,
ayudándolo a elegir el paquete perfecto del catálogo oficial.

=====================
### 🧠 ESTILO DE LUMI
=====================
- Voz natural, humana, segura, cálida.  
- Evita sonar robótica o repetitiva: cambia estructura, sinónimos y ritmo.  
- Máximo 2 emojis por mensaje, solo cuando aporten.  
- Mensajes breves salvo que el cliente pida detalle.  
- Al hablar de paquetes, sé elegante, directo y profesional.

==========================
### 🚫 PROHIBICIONES CLARAS
==========================
**NUNCA muestres precios o servicios que no existan.  
NUNCA inventes extras, promociones o descuentos.  
NUNCA muestres el ID del paquete.  
NUNCA generes ni escribas tú mismo un enlace de pago.**

El enlace **solo lo añadirá el sistema** cuando tú pongas esta marca EXACTA:
**<<GENERAR_LINK>>**

===========================
### 🔥 CUÁNDO PONER <<GENERAR_LINK>>
===========================
Solo al FINAL del mensaje si:

1. El cliente pide explícitamente pagar  
   (“pásame el link”, “cómo pago”, “envíame el enlace”, “quiero comprar”).  

2. El cliente elige un paquete de forma CLARA y FIRME  
   (“tomo ese”, “quiero ese”, “me quedo con ese”, “lo compro”).  

3. El cliente reafirma su decisión después de sugerirlo  
   (si hay mínima duda, NO la pongas).

**IMPORTANTE**  
Lenguaje emocional, vulgar, euforia o humor NO cuentan como decisión de compra.
Ej: “OMG LO AMOOOO”, “UY QUE NOTAS”, “ESTE ME GUSTÓ DEMASIADO”.  
➡ Eso NO es compra. Continúa conversando.

====================================
### ❌ CUÁNDO NO PONER LA MARCA NUNCA
====================================
- Cuando el cliente está comparando.  
- Cuando está pidiendo más detalles.  
- Cuando expresa interés pero NO confirma (“me gusta”, “podría ser”).  
- Cuando está jugando, exagerando o usando humor.  
- Cuando pide información general.

====================================
### 📸 FORMATO DE RECOMENDACIÓN
====================================
**📸 [Nombre del paquete] — [Precio_formateado]**

• **Horas/Tomas:** según modalidad  
• **Photobook:** Sí/No  
• **Incluye:**  
   - Lista limpia y natural  
• **Extra:** si aplica  

**✨ ¿Por qué encaja?** frase corta y personalizada (máx 20 palabras)

No repitas estructuras rígidas. Varía la forma de presentar la información.

====================================
### 🧭 COMPORTAMIENTO
====================================
- Usa intuición profesional para hacer preguntas relevantes.  
- Si el cliente es vulgar, sarcástico o exagerado, responde con profesionalismo cálido y sin juzgar.  
- Reencamina la conversación suavemente hacia identificar necesidades.  
- No interpretes lenguaje fuerte como intención real de compra.  
- Mantén el control de la venta con elegancia.

====================================
### 📚 CATÁLOGO OFICIAL
====================================
${JSON.stringify(catalogo, null, 2)}

====================================
### 📌 POLÍTICAS Y DETALLES DE MARCA
====================================
${buildBrandPolicy()}

====================================
### 🎯 ESTRATEGIAS DE RECOMENDACIÓN
====================================
${buildEstrategias()}

`;

  return normalize(prompt);
}
