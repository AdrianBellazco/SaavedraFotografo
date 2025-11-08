<<<<<<< HEAD
// src/app/data/paquetes.ts
export interface AddOn {
  nombre: string;
  precio: number; // en COP
  descripcion?: string;
}
=======
/* ============================================================================
 * Catálogo de paquetes SaavedraFotografo
 * Este archivo define TODO el inventario que Lumi puede sugerir.
 * - Mantén IDs estables: los usa la UI/IA para referenciar paquetes.
 * - Precios en COP (números sin separadores).
 * - Campo `modalidad`: 'por_fotos' | 'por_horas'
 * - Campo `categoria`: 'Bodas' | 'Quinces' | 'Productos' | 'Personales/Familiares'
 * - Campo `incluye`: lista legible para UI (se muestra tal cual).
 * - Campo `tags`: palabras clave que ayudan a las estrategias.
 * ========================================================================== */

export type Modalidad = 'por_fotos' | 'por_horas';
export type Categoria =
  | 'Bodas'
  | 'Quinces'
  | 'Productos'
  | 'Personales/Familiares';
>>>>>>> master

export interface Paquete {
  id: string;
  nombre: string;
<<<<<<< HEAD
  tipo: 'retrato' | 'boda' | 'producto' | 'editorial' | 'evento' | 'familiar';
  precio: number; // COP
  duracionMin: number; // minutos
  fotosEntregadas: number;
  incluye: string[];
  entrega: string; // plazo/forma
  notas?: string;
  addOns?: AddOn[];
}

export const PAQUETES: Paquete[] = [
  {
    id: 'R-START',
    nombre: 'Retrato Start',
    tipo: 'retrato',
    precio: 180000,
    duracionMin: 30,
    fotosEntregadas: 10,
    incluye: ['1 locación cercana', 'Dirección básica de poses', 'Edición estándar'],
    entrega: 'Galería digital en 5 días hábiles',
    addOns: [
      { nombre: 'Maquillaje básico', precio: 70000 },
      { nombre: 'Entrega exprés (48h)', precio: 50000 }
    ]
  },
  {
    id: 'R-PRO',
    nombre: 'Retrato Pro',
    tipo: 'retrato',
    precio: 280000,
    duracionMin: 60,
    fotosEntregadas: 20,
    incluye: ['Hasta 2 locaciones', 'Dirección de poses', 'Edición estándar', 'Asesoría de vestuario'],
    entrega: 'Galería digital en 5-7 días hábiles',
    addOns: [
      { nombre: 'Maquillaje profesional', precio: 120000 },
      { nombre: 'Entrega exprés (48h)', precio: 80000 }
    ]
  },
  {
    id: 'B-ESS',
    nombre: 'Boda Esencial',
    tipo: 'boda',
    precio: 1200000,
    duracionMin: 240,
    fotosEntregadas: 150,
    incluye: ['Cobertura ceremonia + retratos', 'Edición estándar', 'Galería privada'],
    entrega: 'Galería digital en 7 días hábiles',
    notas: 'Ideal para bodas íntimas',
    addOns: [
      { nombre: 'Cobertura recepción (2h extra)', precio: 300000 },
      { nombre: 'Segundo fotógrafo', precio: 500000 }
    ]
  },
  {
    id: 'PROD-CAT',
    nombre: 'Producto Catálogo',
    tipo: 'producto',
    precio: 350000,
    duracionMin: 90,
    fotosEntregadas: 25,
    incluye: ['Set básico luz continua', 'Fondo neutro', 'Edición de color uniforme'],
    entrega: 'Galería digital en 5 días hábiles',
    addOns: [
      { nombre: 'Retoque avanzado por foto', precio: 20000, descripcion: 'Limpieza, reflejos, polvo, etc.' },
      { nombre: 'Fondo creativo', precio: 50000 }
    ]
  },
  {
    id: 'FAM-MINI',
    nombre: 'Familiar Mini',
    tipo: 'familiar',
    precio: 220000,
    duracionMin: 45,
    fotosEntregadas: 15,
    incluye: ['Parque o locación cercana', 'Dirección de grupo', 'Edición estándar'],
    entrega: 'Galería digital en 5-7 días hábiles'
  }
];
=======
  categoria: Categoria;
  modalidad: Modalidad;
  photobook: boolean;
  horas?: number;            // Para modalidad por_horas
  tomas?: number;            // Para modalidad por_fotos
  precioCOP: number;         // Valor en pesos colombianos
  incluye: string[];         // Lista descriptiva
  regalos?: string[];        // Obsequios / regalos
  notas?: string[];          // Observaciones o aclaraciones comerciales
  tags?: string[];           // Palabras clave para filtrado/estrategias
}

/* =========================
 * EXTRAS (Add-ons)
 * ========================= */
export interface Extra {
  id: string;
  nombre: string;
  descripcion?: string;
  precioCOP: number;
  tags?: string[];
}

export const EXTRAS: Extra[] = [
  {
    id: 'EX-CUADRO-50x70',
    nombre: 'Cuadro 50x70 con moldura tradicional',
    precioCOP: 200000,
    tags: ['impresiones', 'ampliación', 'decoración']
  },
  {
    id: 'EX-VIDEO-CLIP',
    nombre: 'Video clip 3–5 minutos',
    descripcion: 'Postproducción y colorización',
    precioCOP: 200000,
    tags: ['video', 'highlight', 'social']
  },
  {
    id: 'EX-HORA-ADICIONAL',
    nombre: 'Hora adicional de producción',
    precioCOP: 200000,
    tags: ['extra', 'tiempo']
  }
];

/* =========================
 * PAQUETES
 * ========================= */

/** BODAS — POR CANTIDAD DE FOTOS (sin photobook) */
const BODAS_FOTOS_SIN_BOOK: Paquete[] = [
  {
    id: 'B-F-EST',
    nombre: 'Bodas por fotos — Estándar (sin book)',
    categoria: 'Bodas',
    modalidad: 'por_fotos',
    photobook: false,
    tomas: 20,
    precioCOP: 300000,
    incluye: [
      'Se entregan 20 tomas',
      '19 impresas 13x19',
      '1 ampliación 20x30',
      '20 tomas digitales',
      'Postproducción completa y colorización'
    ],
    tags: ['boda', 'fotos', 'sin-book', 'económico']
  },
  {
    id: 'B-F-REC',
    nombre: 'Bodas por fotos — Recomendada (sin book)',
    categoria: 'Bodas',
    modalidad: 'por_fotos',
    photobook: false,
    tomas: 50,
    precioCOP: 800000,
    incluye: [
      'Se entregan 50 tomas',
      '49 impresas 13x19',
      '1 ampliación 30x45',
      '50 tomas digitales',
      'Postproducción completa y colorización'
    ],
    tags: ['boda', 'fotos', 'sin-book', 'recomendada']
  },
  {
    id: 'B-F-DIG-EST',
    nombre: 'Bodas — Promo Digital Estándar',
    categoria: 'Bodas',
    modalidad: 'por_fotos',
    photobook: false,
    tomas: 50,
    precioCOP: 550000,
    incluye: [
      '50 tomas en formato digital',
      'Postproducción y colorización'
    ],
    tags: ['boda', 'digital', 'promoción']
  },
  {
    id: 'B-F-DIG-EXT',
    nombre: 'Bodas — Promo Digital Extendido',
    categoria: 'Bodas',
    modalidad: 'por_fotos',
    photobook: false,
    tomas: 80,
    precioCOP: 850000,
    incluye: [
      '80 tomas en formato digital',
      'Postproducción completa y colorización'
    ],
    tags: ['boda', 'digital', 'extendido', 'promoción']
  },
  {
    id: 'B-F-ILIMITADA',
    nombre: 'Boda Ilimitada (sin book)',
    categoria: 'Bodas',
    modalidad: 'por_fotos',
    photobook: false,
    precioCOP: 1600000,
    incluye: [
      'Cobertura todo el día',
      'Se entregan todas las fotos tomadas',
      'Postproducción completa y colorización'
    ],
    regalos: [
      'Sesión pre-boda dentro de Tuluá (viáticos aparte si es fuera de la ciudad)'
    ],
    tags: ['boda', 'todo-el-día', 'premium']
  }
];

/** BODAS — POR CANTIDAD DE FOTOS (con photobook) */
const BODAS_FOTOS_CON_BOOK: Paquete[] = [
  {
    id: 'B-FB-EST',
    nombre: 'Bodas por fotos — Estándar (con photobook)',
    categoria: 'Bodas',
    modalidad: 'por_fotos',
    photobook: true,
    tomas: 20,
    precioCOP: 570000,
    incluye: [
      '20 tomas',
      'Photobook de 20 tomas',
      'Entrega digital',
      'Postproducción completa y colorización'
    ],
    tags: ['boda', 'photobook', 'fotos']
  },
  {
    id: 'B-FB-EXT',
    nombre: 'Bodas por fotos — Book extendido',
    categoria: 'Bodas',
    modalidad: 'por_fotos',
    photobook: true,
    tomas: 40,
    precioCOP: 780000,
    incluye: [
      '40 tomas',
      'Photobook de 30 tomas',
      'Entrega digital',
      'Postproducción completa y colorización'
    ],
    tags: ['boda', 'photobook', 'extendido']
  },
  {
    id: 'B-FB-REC',
    nombre: 'Bodas por fotos — Recomendado (con photobook)',
    categoria: 'Bodas',
    modalidad: 'por_fotos',
    photobook: true,
    tomas: 60,
    precioCOP: 1500000,
    incluye: [
      '60 tomas',
      'Photobook con 50 fotos',
      'Material digital',
      'Postproducción completa y colorización'
    ],
    tags: ['boda', 'photobook', 'recomendada', 'alto-valor']
  }
];

/** BODAS — POR HORAS (sin photobook) */
const BODAS_HORAS_SIN_BOOK: Paquete[] = [
  {
    id: 'B-H-RECEPCION',
    nombre: 'Bodas por horas — Solo recepción',
    categoria: 'Bodas',
    modalidad: 'por_horas',
    photobook: false,
    horas: 4,
    precioCOP: 500000,
    incluye: [
      '4 horas de cobertura',
      'Todas las fotos digitales con edición completa',
      '29 fotos impresas',
      '1 ampliación 30x40 de regalo'
    ],
    tags: ['boda', 'horas', 'recepción']
  },
  {
    id: 'B-H-IGLESIA-RECEPCION',
    nombre: 'Bodas por horas — Iglesia + Recepción',
    categoria: 'Bodas',
    modalidad: 'por_horas',
    photobook: false,
    horas: 5,
    precioCOP: 800000,
    incluye: [
      'Cobertura ceremonia + 5 horas de recepción',
      'Todas las fotos digitales con edición completa',
      '38 fotos impresas',
      '1 ampliación 30x40 de regalo',
      '1 ampliación 20x30 de regalo'
    ],
    tags: ['boda', 'horas', 'ceremonia', 'recepción']
  },
  {
    id: 'B-H-IGLESIA-RECEPCION-PREBODA',
    nombre: 'Bodas por horas — Iglesia + Recepción + Preboda',
    categoria: 'Bodas',
    modalidad: 'por_horas',
    photobook: false,
    horas: 7, // 5 en evento + 2 preboda
    precioCOP: 1100000,
    incluye: [
      'Cobertura ceremonia + 5 horas de recepción',
      '2 horas de sesión preboda (antes del día de la boda)',
      'Todas las fotos digitales con edición completa',
      '50 fotos impresas',
      '1 ampliación 30x40 de regalo',
      '1 ampliación 20x30 de regalo'
    ],
    tags: ['boda', 'horas', 'preboda', 'completo']
  }
];

/** BODAS — POR HORAS (con photobook) */
const BODAS_HORAS_CON_BOOK: Paquete[] = [
  {
    id: 'B-HB-IGLESIA-RECEPCION',
    nombre: 'Bodas por horas — Iglesia + Recepción (con photobook)',
    categoria: 'Bodas',
    modalidad: 'por_horas',
    photobook: true,
    horas: 5,
    precioCOP: 1100000,
    incluye: [
      'Cobertura ceremonia + 5 horas de recepción',
      'Todas las fotos digitales con edición completa',
      'Photobook con 20 fotos',
      '1 ampliación 20x30 de regalo'
    ],
    tags: ['boda', 'horas', 'photobook']
  },
  {
    id: 'B-HB-IGLESIA-RECEPCION-PREBODA',
    nombre: 'Bodas por horas — Iglesia + Recepción + Preboda (con photobook)',
    categoria: 'Bodas',
    modalidad: 'por_horas',
    photobook: true,
    horas: 7, // 5 evento + 2 preboda
    precioCOP: 1500000,
    incluye: [
      'Cobertura ceremonia + 5 horas de recepción',
      '2 horas de sesión preboda (antes del día de la boda)',
      'Todas las fotos digitales con edición completa',
      'Photobook de 50 fotos',
      '1 ampliación 30x40 de regalo',
      '1 ampliación 20x30 de regalo'
    ],
    tags: ['boda', 'horas', 'photobook', 'preboda', 'premium']
  }
];

/** QUINCES / PRE-QUINCES — POR FOTOS (sin photobook) */
const QUINCES_FOTOS_SIN_BOOK: Paquete[] = [
  {
    id: 'Q-F-PRE-CUADRO',
    nombre: 'Pre-quinces Estándar con cuadro (sin book)',
    categoria: 'Quinces',
    modalidad: 'por_fotos',
    photobook: false,
    tomas: 10,
    precioCOP: 360000,
    incluye: [
      'Se entregan 10 tomas',
      '9 impresas 13x19',
      '1 ampliación 50x70',
      'Archivos digitales con postproducción completa y colorización'
    ],
    tags: ['quinces', 'pre-quinces', 'cuadro', 'sin-book']
  },
  {
    id: 'Q-F-EST',
    nombre: 'Pre-quinces / Quinces Estándar sin cuadro (sin book)',
    categoria: 'Quinces',
    modalidad: 'por_fotos',
    photobook: false,
    tomas: 20,
    precioCOP: 300000,
    incluye: [
      'Se entregan 20 tomas',
      '19 impresas 13x19',
      '1 ampliación 20x30',
      '20 tomas digitales',
      'Postproducción completa y colorización'
    ],
    tags: ['quinces', 'sin-book', 'estándar']
  },
  {
    id: 'Q-F-EXT-30',
    nombre: 'Quinces extendidos 30 tomas (sin book)',
    categoria: 'Quinces',
    modalidad: 'por_fotos',
    photobook: false,
    tomas: 30,
    precioCOP: 550000,
    incluye: [
      'Se entregan 30 tomas',
      '29 impresas 13x19',
      '1 ampliación 20x30',
      'Obsequio 1 foto 30x45',
      'Archivos digitales con postproducción completa y colorización'
    ],
    tags: ['quinces', 'extendido', 'sin-book']
  },
  {
    id: 'Q-F-REC',
    nombre: 'Quinces Recomendada (sin book)',
    categoria: 'Quinces',
    modalidad: 'por_fotos',
    photobook: false,
    tomas: 50,
    precioCOP: 800000,
    incluye: [
      'Se entregan 50 tomas',
      '49 impresas 13x19',
      '1 ampliación 30x45',
      '50 tomas digitales',
      'Postproducción completa y colorización'
    ],
    tags: ['quinces', 'recomendada', 'sin-book']
  },
  {
    id: 'Q-F-DIG-EST',
    nombre: 'Quinces — Promo Digital Estándar',
    categoria: 'Quinces',
    modalidad: 'por_fotos',
    photobook: false,
    tomas: 50,
    precioCOP: 550000,
    incluye: [
      '50 tomas en formato digital',
      'Postproducción y colorización'
    ],
    tags: ['quinces', 'digital', 'promoción']
  },
  {
    id: 'Q-F-DIG-EXT',
    nombre: 'Quinces — Promo Digital Extendido',
    categoria: 'Quinces',
    modalidad: 'por_fotos',
    photobook: false,
    tomas: 80,
    precioCOP: 850000,
    incluye: [
      '80 tomas en formato digital',
      'Postproducción completa y colorización'
    ],
    tags: ['quinces', 'digital', 'extendido', 'promoción']
  }
];

/** QUINCES / PRE-QUINCES — POR FOTOS (con photobook) */
const QUINCES_FOTOS_CON_BOOK: Paquete[] = [
  {
    id: 'Q-FB-EST',
    nombre: 'Quinces Estándar (con photobook)',
    categoria: 'Quinces',
    modalidad: 'por_fotos',
    photobook: true,
    tomas: 20,
    precioCOP: 570000,
    incluye: [
      '20 tomas (pre-quince o quince)',
      'Photobook de 20 tomas',
      'Entrega digital',
      'Postproducción completa y colorización'
    ],
    tags: ['quinces', 'photobook', 'estándar']
  },
  {
    id: 'Q-FB-EXT',
    nombre: 'Quinces Book extendido (con photobook)',
    categoria: 'Quinces',
    modalidad: 'por_fotos',
    photobook: true,
    tomas: 40,
    precioCOP: 780000,
    incluye: [
      '40 tomas (pre-quince o quince)',
      'Photobook de 30 tomas',
      'Material digital',
      'Postproducción completa y colorización'
    ],
    tags: ['quinces', 'photobook', 'extendido']
  },
  {
    id: 'Q-FB-REC',
    nombre: 'Quinces Recomendado (con photobook)',
    categoria: 'Quinces',
    modalidad: 'por_fotos',
    photobook: true,
    tomas: 60,
    precioCOP: 1500000,
    incluye: [
      '60 tomas (entre pre-quince y quince)',
      'Photobook con 50 fotos (25 pre-quinces + 25 fiesta)',
      'Material digital',
      'Postproducción completa y colorización'
    ],
    tags: ['quinces', 'photobook', 'recomendada']
  }
];

/** QUINCES / PRE-QUINCES — POR HORAS (sin photobook) */
const QUINCES_HORAS_SIN_BOOK: Paquete[] = [
  {
    id: 'Q-H-STD',
    nombre: 'Pre-quinces o Quinces — Estándar por horas',
    categoria: 'Quinces',
    modalidad: 'por_horas',
    photobook: false,
    horas: 4,
    precioCOP: 500000,
    incluye: [
      '4 horas de cobertura',
      'Todas las fotos digitales con edición completa',
      '29 fotos impresas',
      '1 ampliación 30x40 de regalo'
    ],
    tags: ['quinces', 'horas', 'estándar']
  },
  {
    id: 'Q-H-EXT',
    nombre: 'Pre-quinces o Quinces — Extendido por horas',
    categoria: 'Quinces',
    modalidad: 'por_horas',
    photobook: false,
    horas: 6,
    precioCOP: 700000,
    incluye: [
      '6 horas de cobertura en la recepción',
      'Todas las fotos digitales con edición completa',
      '40 fotos impresas',
      '1 ampliación 30x40 de regalo',
      '1 ampliación 20x30 de regalo'
    ],
    tags: ['quinces', 'horas', 'extendido']
  },
  {
    id: 'Q-H-MOMENTO-COMPLETO',
    nombre: 'Momento completo Pre-quince + Quince',
    categoria: 'Quinces',
    modalidad: 'por_horas',
    photobook: false,
    horas: 10, // 4 estudio + 6 evento
    precioCOP: 1200000,
    incluye: [
      '10 horas de cobertura total',
      '4 horas foto estudio pre-quinces',
      '6 horas evento quince años',
      'Todas las fotos digitales con edición completa',
      '60 fotos impresas',
      '1 ampliación 30x40 de regalo'
    ],
    tags: ['quinces', 'horas', 'completo']
  }
];

/** QUINCES / PRE-QUINCES — POR HORAS (con photobook) */
const QUINCES_HORAS_CON_BOOK: Paquete[] = [
  {
    id: 'Q-HB-STD',
    nombre: 'Quinces — Estándar con photobook',
    categoria: 'Quinces',
    modalidad: 'por_horas',
    photobook: true,
    precioCOP: 570000,
    incluye: [
      'Cobertura: pre-quince o fiesta de quinces',
      '30 tomas digitales',
      'Photobook de 20 tomas',
      'Postproducción completa y colorización'
    ],
    tags: ['quinces', 'horas', 'photobook']
  },
  {
    id: 'Q-HB-EXT',
    nombre: 'Quinces — Book extendido con photobook',
    categoria: 'Quinces',
    modalidad: 'por_horas',
    photobook: true,
    precioCOP: 780000,
    incluye: [
      'Cobertura: pre-quince o fiesta de quinces',
      '40 tomas',
      'Photobook de 30 tomas',
      'Material digital',
      'Postproducción completa y colorización'
    ],
    tags: ['quinces', 'horas', 'photobook', 'extendido']
  },
  {
    id: 'Q-HB-REC',
    nombre: 'Quinces — Recomendado con photobook',
    categoria: 'Quinces',
    modalidad: 'por_horas',
    photobook: true,
    precioCOP: 1500000,
    incluye: [
      'Cobertura: pre-quince y fiesta de quinces',
      '50 tomas',
      'Book con 50 fotos',
      'Material digital',
      'Postproducción completa y colorización'
    ],
    tags: ['quinces', 'horas', 'photobook', 'recomendada']
  }
];

/** ESTUDIO DE PRODUCTOS (para redes sociales) */
const PRODUCTOS: Paquete[] = [
  {
    id: 'P-STD',
    nombre: 'Estudio de Productos — Estándar',
    categoria: 'Productos',
    modalidad: 'por_horas',
    photobook: false,
    horas: 1,
    precioCOP: 180000,
    incluye: [
      '1 hora de producción',
      '10 tomas digitales optimizadas para redes y originales para impresión'
    ],
    notas: ['Estos precios no incluyen viáticos'],
    tags: ['producto', 'redes', 'estudio']
  },
  {
    id: 'P-EXT',
    nombre: 'Estudio de Productos — Extendido',
    categoria: 'Productos',
    modalidad: 'por_horas',
    photobook: false,
    horas: 2,
    precioCOP: 300000,
    incluye: [
      '2 horas de producción',
      '20 tomas digitales optimizadas para redes y originales para impresión'
    ],
    notas: [
      'Cada hora de producción viene con 10 fotos adicionales',
      'Hora adicional de producción: 200.000',
      'Estos precios no incluyen viáticos'
    ],
    tags: ['producto', 'redes', 'estudio', 'extendido']
  }
];

/** ESTUDIO PERSONALES / FAMILIARES */
const PERSONALES_FAMILIARES: Paquete[] = [
  {
    id: 'PF-STD',
    nombre: 'Personales/Familiares — Estándar',
    categoria: 'Personales/Familiares',
    modalidad: 'por_horas',
    photobook: false,
    horas: 1,
    precioCOP: 150000,
    incluye: [
      '1 hora de sesión',
      '10 tomas (digitales y físicas)'
    ],
    notas: ['Estos precios no incluyen viáticos'],
    tags: ['personal', 'familiar', 'estudio', 'estándar']
  },
  {
    id: 'PF-EXT',
    nombre: 'Personales/Familiares — Extendido',
    categoria: 'Personales/Familiares',
    modalidad: 'por_horas',
    photobook: false,
    horas: 2,
    precioCOP: 300000,
    incluye: [
      '2 horas de producción',
      '20 tomas (digitales y físicas)'
    ],
    notas: [
      'Cada hora de producción viene con 10 fotos adicionales',
      'Hora adicional de producción: 200.000',
      'Estos precios no incluyen viáticos'
    ],
    tags: ['personal', 'familiar', 'estudio', 'extendido']
  }
];

/* Export único consumido por la IA/UI */
export const PAQUETES: Paquete[] = [
  // Bodas por fotos
  ...BODAS_FOTOS_SIN_BOOK,
  ...BODAS_FOTOS_CON_BOOK,

  // Bodas por horas
  ...BODAS_HORAS_SIN_BOOK,
  ...BODAS_HORAS_CON_BOOK,

  // Quinces por fotos
  ...QUINCES_FOTOS_SIN_BOOK,
  ...QUINCES_FOTOS_CON_BOOK,

  // Quinces por horas
  ...QUINCES_HORAS_SIN_BOOK,
  ...QUINCES_HORAS_CON_BOOK,

  // Productos y Personales/Familiares
  ...PRODUCTOS,
  ...PERSONALES_FAMILIARES
];
>>>>>>> master
