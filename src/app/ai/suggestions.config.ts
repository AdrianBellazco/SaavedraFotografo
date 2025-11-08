<<<<<<< HEAD
// src/app/ai/suggestions.config.ts
export type Modo = 'asesor' | 'ventas';

export interface EstrategiaTipo {
  prioridadPaquetes: string[]; // IDs de paquetes
  upsellAddons?: string[];
  maxOpcionesMostrar: number;
  notas?: string;
}

export interface EstrategiasSugerencia {
  modo: Modo;
  generales: {
    siempreDiagnosticar: boolean;
    preguntasDiagnostico: string[];
    siempreOfrecerAlternativa: boolean;
    mostrarPrecios: 'siempre' | 'segunPresupuesto' | 'aPedido';
  };
  porTipo: Record<string, EstrategiaTipo>;
}

export const ESTRATEGIAS: EstrategiasSugerencia = {
  modo: 'asesor',
  generales: {
    siempreDiagnosticar: true,
    preguntasDiagnostico: [
      '¿Para qué objetivo es la sesión?',
      '¿Qué estilo visual te gusta?',
      '¿Para cuándo y dónde sería?',
      '¿Cuántas personas participan?',
      '¿Tienes un presupuesto aproximado?'
    ],
    siempreOfrecerAlternativa: true,
    mostrarPrecios: 'siempre'
  },
  porTipo: {
    general: {
      prioridadPaquetes: ['DG-EXT', 'BK-REC', 'SB-REC', 'DG-STD', 'SB-STD', 'BK-EXT', 'BK-STD'],
      upsellAddons: [
        'Cuadro 50x70 con moldura tradicional',
        'Video clip 3-5 minutos (postproducción y colorización)'
      ],
      maxOpcionesMostrar: 2,
      notas: 'Si el cliente pide impresiones, prioriza Sin Book o Book; si quiere solo digital, prioriza Promoción Digital.'
    },
    boda: {
      prioridadPaquetes: ['BOD-ILIM'],
      upsellAddons: [
        'Cuadro 50x70 con moldura tradicional',
        'Video clip 3-5 minutos (postproducción y colorización)'
      ],
      maxOpcionesMostrar: 1,
      notas: 'Resalta la sesión pre-boda incluida (en Tuluá). Si el evento es fuera de la ciudad, recuerda viáticos.'
    }
=======
/* ============================================================================
 * suggestions.config.ts
 * Reglas de recomendación que Lumi usa para priorizar paquetes.
 *
 * Estructura esperada por ai.config.ts:
 *  - ESTRATEGIAS.prioridades: Array<{ descripcion: string; tags: string[] }>
 *  - ESTRATEGIAS.maxOpciones: number
 *  - ESTRATEGIAS.diagnostico.preguntas: string[]
 * ========================================================================== */

export interface ReglaPrioridad {
  descripcion: string;
  tags: string[]; // palabras clave que deben aparecer en package.tags
}

export interface EstrategiasConfig {
  prioridades: ReglaPrioridad[];
  maxOpciones: number;
  diagnostico: {
    preguntas: string[];
  };
}

export const ESTRATEGIAS: EstrategiasConfig = {
  // MÁXIMO de opciones que Lumi debe devolver por consulta
  maxOpciones: 3,

  // Reglas de prioridad (de arriba hacia abajo)
  prioridades: [
    // ======== Bodas ========
    {
      descripcion: 'Si el cliente pide cobertura todo el día → priorizar Boda Ilimitada',
      tags: ['boda', 'todo-el-día']
    },
    {
      descripcion: 'Si mencionan Iglesia + Recepción → priorizar paquetes con ceremonia',
      tags: ['boda', 'ceremonia', 'recepción']
    },
    {
      descripcion: 'Si piden preboda → priorizar paquetes con preboda incluida',
      tags: ['boda', 'preboda']
    },
    {
      descripcion: 'Si piden solo digital → priorizar paquetes tipo promoción digital',
      tags: ['boda', 'digital', 'promoción']
    },
    {
      descripcion: 'Si piden photobook → priorizar paquetes con photobook',
      tags: ['boda', 'photobook']
    },

    // ======== Quinces ========
    {
      descripcion: 'Pre-quinces con cuadro → priorizar pre-quinces con cuadro 50x70',
      tags: ['quinces', 'pre-quinces', 'cuadro']
    },
    {
      descripcion: 'Momento completo (pre + evento) → priorizar paquete integral',
      tags: ['quinces', 'completo']
    },
    {
      descripcion: 'Si piden photobook en quinces → priorizar photobook',
      tags: ['quinces', 'photobook']
    },

    // ======== Productos / Personales ========
    {
      descripcion: 'Productos para redes → priorizar estudio de producto',
      tags: ['producto', 'redes', 'estudio']
    },
    {
      descripcion: 'Sesión familiar sencilla → priorizar Personales/Familiares Estándar',
      tags: ['personal', 'familiar', 'estándar']
    }
  ],

  // Preguntas cortas de diagnóstico para completar información faltante
  diagnostico: {
    preguntas: [
      '¿Prefieres paquete por horas o por cantidad de fotos?',
      '¿Quieres photobook o solo digital?',
      '¿Cuál es tu presupuesto aproximado?',
      '¿En qué ciudad será la sesión/evento?',
      '¿Necesitas incluir preboda o algún extra (cuadro 50x70, video clip)?'
    ]
>>>>>>> master
  }
};
