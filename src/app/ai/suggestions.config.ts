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
  }
};
