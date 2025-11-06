import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CarritoService } from '../../services/carrito.service';


export interface Servicio {
  titulo: string;
  descripcion: string;
  detalle: string;
  imagen: string;
  precio?: number;
}

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {
  // ================
  // BODAS – POR FOTOS
  // ================

  // Paquetes sin Book
  bodasPorFotosSinBook: Servicio[] = [
    {
      titulo: 'Bodas Estándar (20 tomas)',
      descripcion: 'Paquete sin photobook.',
      detalle:
        '• se entregan 20 tomas\n' +
        '• 19 con una medida 13x19\n' +
        '• 1 con una medida 20x30\n' +
        '• 20 tomas digitales\n' +
        '• postproducción completa y colonización\n' +
        '• valor: 300.000',
      imagen: 'assets/bodas/por-fotos/estandar-20.jpg',
      precio: 300000
    },
    {
      titulo: 'Bodas Recomendada (50 tomas)',
      descripcion: 'Paquete sin photobook.',
      detalle:
        '• se entregan 50 tomas\n' +
        '• 49 con medida 13x19\n' +
        '• 1 con medida 30x45\n' +
        '• 50 tomas digitales\n' +
        '• postproducción completa y colonización\n' +
        '• valor: 800.000',
      imagen: 'assets/bodas/por-fotos/recomendada-50.jpg',
      precio: 800000
    }
  ];

  // Promoción solo digitales
  bodasPromosDigitales: Servicio[] = [
    {
      titulo: 'Bodas Promo Estándar (50 digitales)',
      descripcion: 'Promoción solo digital.',
      detalle:
        '• 50 tomas formato digital\n' +
        '• postproducción y colonización\n' +
        '• valor: 550.000',
      imagen: 'assets/bodas/promos/promo-50.jpg',
      precio: 550000
    },
    {
      titulo: 'Bodas Promo Extendido (80 digitales)',
      descripcion: 'Promoción solo digital.',
      detalle:
        '• 80 tomas en formato digital\n' +
        '• postproducción completa y colonización\n' +
        '• valor: 850.000',
      imagen: 'assets/bodas/promos/promo-80.jpg',
      precio: 850000
    },
    {
      titulo: 'Boda ilimitada (cobertura total)',
      descripcion: 'Cobertura todo el día.',
      detalle:
        '• Se entregan todas las fotos tomadas, cobertura todo el día\n' +
        '• postproducción completa y colonización\n' +
        '• valor: 1’600.000\n' +
        '• extra✨: por la compra de este paquete te regalamos una sesión pre-boda dentro de la ciudad de Tuluá (si es fuera, se deberán cubrir viáticos)',
      imagen: 'assets/bodas/promos/ilimitada.jpg',
      precio: 1600000
    }
  ];

  // Paquetes con photobook
  bodasPorFotosConBook: Servicio[] = [
    {
      titulo: 'Bodas Estándar + Photobook (20 tomas)',
      descripcion: 'Incluye photobook de 20.',
      detalle:
        '• 20 tomas\n' +
        '• se entrega photobook de 20 tomas\n' +
        '• entrega digital\n' +
        '• postproducción completa y colonización\n' +
        '• valor: 570.000',
      imagen: 'assets/bodas/por-fotos/book-20.jpg',
      precio: 570000
    },
    {
      titulo: 'Bodas Book Extendido (40 tomas / PB 30)',
      descripcion: 'Incluye photobook de 30.',
      detalle:
        '• 40 tomas\n' +
        '• se entrega photobook de 30 tomas\n' +
        '• se entrega material digital\n' +
        '• postproducción completa y colonización\n' +
        '• valor: 780.000',
      imagen: 'assets/bodas/por-fotos/book-30.jpg',
      precio: 780000
    },
    {
      titulo: 'Bodas Recomendado + Photobook (60 / PB 50)',
      descripcion: 'Incluye photobook de 50.',
      detalle:
        '• 60 tomas\n' +
        '• se entrega photobook con 50 fotos\n' +
        '• se entrega material digital\n' +
        '• postproducción completa y colonización\n' +
        '• valor: 1’500.000',
      imagen: 'assets/bodas/por-fotos/book-50.jpg',
      precio: 1500000
    }
  ];

  // ================
  // BODAS – POR HORAS
  // ================

  // Sin photobook
  bodasPorHorasSinBook: Servicio[] = [
    {
      titulo: 'Solo Recepción (4 horas)',
      descripcion: 'Paquete por horas sin photobook.',
      detalle:
        '• 4 horas de cobertura\n' +
        '• Todas las fotos digitales con edición completa\n' +
        '• 29 fotos impresas\n' +
        '• 1 ampliación 30x40 de regalo\n' +
        '• valor: 500.000',
      imagen: 'assets/bodas/por-horas/solo-recepcion.jpg',
      precio: 500000
    },
    {
      titulo: 'Iglesia + Recepción (5 horas)',
      descripcion: 'Paquete por horas sin photobook.',
      detalle:
        '• 5 horas de cobertura en la recepción + cobertura en la ceremonia\n' +
        '• Todas las fotos digitales con edición completa\n' +
        '• 38 fotos impresas\n' +
        '• 1 ampliación 30x40 de regalo\n' +
        '• 1 ampliación 20x30 de regalo\n' +
        '• valor: 800.000',
      imagen: 'assets/bodas/por-horas/iglesia-recepcion.jpg',
      precio: 800000
    },
    {
      titulo: 'Iglesia + Recepción + Preboda',
      descripcion: 'Incluye 2 horas de preboda.',
      detalle:
        '• 5 horas de cobertura en la recepción + cobertura en la ceremonia\n' +
        '• 2 hora de preboda antes del día de la boda\n' +
        '• Todas las fotos digitales con edición completa\n' +
        '• 50 fotos impresas\n' +
        '• 1 ampliación 30x40 de regalo\n' +
        '• 1 ampliación 20x30 de regalo\n' +
        '• valor: 1´100.000',
      imagen: 'assets/bodas/por-horas/iglesia-recepcion-preboda.jpg',
      precio: 1100000
    }
  ];

  // Con photobook
  bodasPorHorasConBook: Servicio[] = [
    {
      titulo: 'Iglesia + Recepción + Photobook 20',
      descripcion: 'Paquete por horas con photobook.',
      detalle:
        '• 5 horas de cobertura en la recepción + cobertura en la ceremonia\n' +
        '• Todas las fotos digitales con edición completa\n' +
        '• Photobook con 20 fotos\n' +
        '• 1 ampliación 20x30 de regalo\n' +
        '• valor: 1´100.000',
      imagen: 'assets/bodas/por-horas/book-20.jpg',
      precio: 1100000
    },
    {
      titulo: 'Iglesia + Recepción + Preboda + Photobook 50',
      descripcion: 'Incluye 2 h de preboda.',
      detalle:
        '• 5 horas de cobertura en la recepción + cobertura en la ceremonia\n' +
        '• 2 hora de preboda antes del día de la boda\n' +
        '• Todas las fotos digitales con edición completa\n' +
        '• photobook de 50 fotos\n' +
        '• 1 ampliación 30x40 de regalo\n' +
        '• 1 ampliación 20x30 de regalo\n' +
        '• valor: 1´500.000',
      imagen: 'assets/bodas/por-horas/book-50.jpg',
      precio: 1500000
    }
  ];

  // =====
  // Extras (Bodas / Quince compartidos)
  // =====
  extrasEvento: Servicio[] = [
    {
      titulo: 'Cuadro 50x70 con moldura tradicional',
      descripcion: 'Impresión y enmarcado.',
      detalle: '• Cuadro 50x70 con moldura tradicional\n• valor: 200.000',
      imagen: 'assets/extras/cuadro-50x70.jpg',
      precio: 200000
    },
    {
      titulo: 'Video clip 3–5 minutos',
      descripcion: 'Resumen audiovisual.',
      detalle: '• Video clip 3–5 minutos\n• postproducción y colonización\n• valor: 200.000',
      imagen: 'assets/extras/videoclip-3-5.jpg',
      precio: 200000
    }
  ];

  // =========================
  // QUINCES & PRE-QUINCES – POR FOTOS
  // =========================

  // Sin Book
  quincesPorFotosSinBook: Servicio[] = [
    {
      titulo: 'Pre-quinces Estándar con Cuadro (10 tomas)',
      descripcion: 'Incluye cuadro 50x70.',
      detalle:
        '• se entregan 10 tomas\n' +
        '• 9 con una medida 13x19\n' +
        '• 1 con una medida 50x70\n' +
        '• archivos digitales, postproducción completa y colonización\n' +
        '• valor: 360.000',
      imagen: 'assets/quinces/por-fotos/pre-cuadro-10.jpg',
      precio: 360000
    },
    {
      titulo: 'Pre-quinces Estándar sin Cuadro (20 tomas)',
      descripcion: 'Sin cuadro.',
      detalle:
        '• se entregan 20 tomas\n' +
        '• 19 con una medida 13x19\n' +
        '• 1 con una medida 20x30\n' +
        '• 20 tomas digitales\n' +
        '• postproducción completa y colonización\n' +
        '• valor: 300.000',
      imagen: 'assets/quinces/por-fotos/pre-estandar-20.jpg',
      precio: 300000
    },
    {
      titulo: 'Quinces Extendidos (30 tomas + obsequio)',
      descripcion: 'Incluye 1 ampliación 30x45.',
      detalle:
        '• se entregan 30 tomas\n' +
        '• 29 con una medida 13x19\n' +
        '• 1 con una medida 20x30\n' +
        '• Obsequio 1 foto con medida 30x45\n' +
        '• archivos digitales, postproducción completa y colonización\n' +
        '• valor: 550.000',
      imagen: 'assets/quinces/por-fotos/extendidos-30.jpg',
      precio: 550000
    },
    {
      titulo: 'Quinces Recomendada (50 tomas)',
      descripcion: 'Paquete sin photobook.',
      detalle:
        '• se entregan 50 tomas\n' +
        '• 49 con medida 13x19\n' +
        '• 1 con medida 30x45\n' +
        '• 50 tomas digitales\n' +
        '• postproducción completa y colonización\n' +
        '• valor: 800.000',
      imagen: 'assets/quinces/por-fotos/recomendada-50.jpg',
      precio: 800000
    }
  ];

  // Promos solo digitales
  quincesPromosDigitales: Servicio[] = [
    {
      titulo: 'Quinces Promo Estándar (50 digitales)',
      descripcion: 'Promoción solo digital.',
      detalle:
        '• 50 tomas formato digital\n' +
        '• postproducción y colonización\n' +
        '• valor: 550.000',
      imagen: 'assets/quinces/promos/promo-50.jpg',
      precio: 550000
    },
    {
      titulo: 'Quinces Promo Extendido (80 digitales)',
      descripcion: 'Promoción solo digital.',
      detalle:
        '• 80 tomas en formato digital\n' +
        '• postproducción completa y colonización\n' +
        '• valor: 850.000',
      imagen: 'assets/quinces/promos/promo-80.jpg',
      precio: 850000
    }
  ];

  // Con photobook
  quincesPorFotosConBook: Servicio[] = [
    {
      titulo: 'Quince Estándar + Photobook (20)',
      descripcion: 'Solo pre-quince o quince.',
      detalle:
        '• 20 tomas solo pre-quince o quince\n' +
        '• se entrega photobook de 20 tomas\n' +
        '• entrega digital\n' +
        '• postproducción completa y colonización\n' +
        '• valor: 570.000',
      imagen: 'assets/quinces/por-fotos/book-20.jpg',
      precio: 570000
    },
    {
      titulo: 'Quince Book Extendido (40 / PB 30)',
      descripcion: 'Solo pre-quince o quince.',
      detalle:
        '• 40 tomas solo pre-quince o quince\n' +
        '• se entrega photobook de 30 tomas\n' +
        '• se entrega material digital\n' +
        '• postproducción completa y colonización\n' +
        '• valor: 780.000',
      imagen: 'assets/quinces/por-fotos/book-30.jpg',
      precio: 780000
    },
    {
      titulo: 'Quince Recomendado (pre + fiesta / PB 50)',
      descripcion: 'Pre-quince + fiesta.',
      detalle:
        '• 60 tomas (entre prequince y quince)\n' +
        '• se entrega photobook con 50 fotos:\n' +
        '  · 25 tomas de pre-quinces\n' +
        '  · 25 tomas en la fiesta de quinces\n' +
        '• se entrega material digital\n' +
        '• postproducción completa y colonización\n' +
        '• valor: 1’500.000',
      imagen: 'assets/quinces/por-fotos/book-50.jpg',
      precio: 1500000
    }
  ];

  // =========================
  // PRE-QUINCE & QUINCE – POR HORAS
  // =========================

  // Sin photobook
  quincesPorHorasSinBook: Servicio[] = [
    {
      titulo: 'Estándar (solo pre-quince o quince) – 4 h',
      descripcion: 'Paquete por horas sin photobook.',
      detalle:
        '• 4 horas de cobertura\n' +
        '• Todas las fotos digitales con edición completa\n' +
        '• 29 fotos impresas\n' +
        '• 1 ampliación 30x40 de regalo\n' +
        '• valor: 500.000',
      imagen: 'assets/quinces/por-horas/estandar-4h.jpg',
      precio: 500000
    },
    {
      titulo: 'Extendido (solo pre-quince o quince) – 6 h',
      descripcion: 'Paquete por horas sin photobook.',
      detalle:
        '• 6 horas de cobertura en la recepción\n' +
        '• Todas las fotos digitales con edición completa\n' +
        '• 40 fotos impresas\n' +
        '• 1 ampliación 30x40 de regalo\n' +
        '• 1 ampliación 20x30 de regalo\n' +
        '• valor: 700.000',
      imagen: 'assets/quinces/por-horas/extendido-6h.jpg',
      precio: 700000
    },
    {
      titulo: 'Momento Completo Pre-quince + Quince – 10 h',
      descripcion: 'Cobertura total pre + evento.',
      detalle:
        '• 10 horas de cobertura total\n' +
        '  · 4 horas foto estudio pre-quinces\n' +
        '  · 6 horas evento quince años\n' +
        '• Todas las fotos digitales con edición completa\n' +
        '• 60 fotos impresas\n' +
        '• 1 ampliación 30x40 de regalo\n' +
        '• valor: 1.200.000',
      imagen: 'assets/quinces/por-horas/momento-completo-10h.jpg',
      precio: 1200000
    }
  ];

  // Con photobook
  quincesPorHorasConBook: Servicio[] = [
    {
      titulo: 'Quince Estándar + Photobook 20',
      descripcion: 'Pre-quince o fiesta.',
      detalle:
        '• cobertura: pre quince o fiesta de quinces\n' +
        '• 30 tomas digitales\n' +
        '• se entrega photobook de 20 tomas\n' +
        '• postproducción completa y colonización\n' +
        '• valor: 570.000',
      imagen: 'assets/quinces/por-horas/book-20.jpg',
      precio: 570000
    },
    {
      titulo: 'Quince Book Extendido + Photobook 30',
      descripcion: 'Pre-quince o fiesta.',
      detalle:
        '• cobertura: pre quince o fiesta de quinces\n' +
        '• 40 tomas\n' +
        '• se entrega photobook de 30 tomas\n' +
        '• se entrega material digital\n' +
        '• postproducción completa y colonización\n' +
        '• valor: 780.000',
      imagen: 'assets/quinces/por-horas/book-30.jpg',
      precio: 780000
    },
    {
      titulo: 'Quince Recomendado (pre + fiesta) + Photobook 50',
      descripcion: 'Pre-quince y fiesta.',
      detalle:
        '• cobertura: pre quince y fiesta de quinces\n' +
        '• 50 tomas\n' +
        '• se entrega book con 50 fotos\n' +
        '• se entrega material digital\n' +
        '• postproducción completa y colonización\n' +
        '• valor: 1’500.000',
      imagen: 'assets/quinces/por-horas/book-50.jpg',
      precio: 1500000
    }
  ];

  // =========================
  // ESTUDIO DE PRODUCTOS
  // =========================
  estudioProducto: Servicio[] = [
    {
      titulo: 'Productos Estándar (10 tomas)',
      descripcion: 'Para redes sociales.',
      detalle:
        '• 1 horas de producción\n' +
        '• 10 tomas que se entregan digitales optimizadas para redes sociales y originales para impresiones grandes\n' +
        '• Valor: 180.000',
      imagen: 'assets/productos/estandar-10.jpg',
      precio: 180000
    },
    {
      titulo: 'Productos Extendido (20 tomas)',
      descripcion: 'Más variedad.',
      detalle:
        '• 2 horas de producción\n' +
        '• 20 tomas que se entregan digitales optimizadas para redes sociales y originales para impresiones grandes\n' +
        '• Valor: 300.000',
      imagen: 'assets/productos/extendido-20.jpg',
      precio: 300000
    },
    {
      titulo: 'Extras de Estudio de Productos',
      descripcion: 'Horas y condiciones.',
      detalle:
        '• Cada hora de producción viene con un adicional de 10 fotos\n' +
        '• Hora adicional de producción: 200.000\n' +
        '• Estos precios no incluyen viáticos',
      imagen: 'assets/productos/extras.jpg'
    }
  ];

  // =========================
  // ESTUDIO PERSONALES – FAMILIARES
  // =========================
  estudioFamiliar: Servicio[] = [
    {
      titulo: 'Personales/Familiares Estándar (10 tomas)',
      descripcion: 'Sesión personal o familiar.',
      detalle:
        '• 1 horas de sesión\n' +
        '• 10 tomas que se entregan digitales y físicas\n' +
        '• Valor: 150.000',
      imagen: 'assets/personales/estandar-10.jpg',
      precio: 150000
    },
    {
      titulo: 'Personales/Familiares Extendido (20 tomas)',
      descripcion: 'Sesión más completa.',
      detalle:
        '• 2 horas de producción\n' +
        '• 20 tomas que se entregan digitales y físicas\n' +
        '• Valor: 300.000',
      imagen: 'assets/personales/extendido-20.jpg',
      precio: 300000
    },
    {
      titulo: 'Extras de Estudio Familiar',
      descripcion: 'Horas y condiciones.',
      detalle:
        '• Cada hora de producción viene con un adicional de 10 fotos\n' +
        '• Hora adicional de producción: 200.000\n' +
        '• Estos precios no incluyen viáticos',
      imagen: 'assets/personales/extras.jpg'
    }
  ];

    // ============ LÓGICA MODAL ============
  modalAbierto = false;
  servicioSeleccionado: Servicio | null = null;

  constructor(
    private authService: AuthService,
    private carritoService: CarritoService, // ✅ SE AÑADE AQUÍ
    private router: Router
  ) {}

  abrirModal(servicio: Servicio) {
    this.servicioSeleccionado = servicio;
    this.modalAbierto = true;
    document.body.classList.add('no-scroll');
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.servicioSeleccionado = null;
    document.body.classList.remove('no-scroll');
  }

  agregarAlCarrito(s: Servicio) {
    if (!this.authService.isAuthenticated()) {
      // 🚫 Si no hay sesión → guardar intento y redirigir a login
      this.authService.setPendingRedirect('/catalogo', s);
      this.router.navigate(['/login']);
      return;
    }

    // ✅ Si hay sesión → añadir al carrito
    this.carritoService.agregarAlCarrito(s);
    this.cerrarModal();
    alert('✅ Paquete añadido al carrito');
  }

  // Cerrar con ESC
  @HostListener('window:keydown.escape')
  onEsc() {
    if (this.modalAbierto) this.cerrarModal();
  }
}