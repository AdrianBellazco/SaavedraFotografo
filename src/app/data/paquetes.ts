// src/app/data/paquetes.ts
export interface AddOn {
  nombre: string;
  precio: number; // en COP
  descripcion?: string;
}

export interface Paquete {
  id: string;
  nombre: string;
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
