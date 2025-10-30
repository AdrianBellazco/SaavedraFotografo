import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent {
  servicios = [
    {
      titulo: 'Fotografía de Bodas',
      descripcion: 'Capturamos los momentos más importantes de tu día con estilo natural y elegante.',
      detalle: 'Incluye cobertura completa del evento, sesión pre-boda y edición profesional de todas las fotos.',
      imagen: '/assets/fotos-boda.jpg'
    },
    {
      titulo: 'Fotos de 15 Años',
      descripcion: 'Inmortalizamos este momento único con sesiones creativas y memorables.',
      detalle: 'Sesión personalizada en exteriores o estudio con vestuario, maquillaje y edición de alta calidad.',
      imagen: '/assets/15.jpg'
    },
    {
      titulo: 'Fotos Urbanas',
      descripcion: 'Retratos urbanos con actitud, perfectos para redes sociales y portafolios.',
      detalle: 'Sesiones en locaciones modernas con iluminación natural o artificial según tu estilo.',
      imagen: '/assets/urban.jpg'
    },
    {
      titulo: 'Fotos para tu Empresa',
      descripcion: 'Fotografía corporativa profesional para mejorar tu presencia de marca.',
      detalle: 'Incluye retratos de equipo, instalaciones y productos con enfoque empresarial.',
      imagen: '/assets/empresa.jpg'
    },
    {
      titulo: 'Video Marketing',
      descripcion: 'Promociona tu marca con videos dinámicos y contenido visual atractivo.',
      detalle: 'Producción completa de videos publicitarios y reels con enfoque en redes sociales.',
      imagen: '/assets/video-marketing.jpg'
    }
  ];

  servicioSeleccionado: any = null;

  abrirModal(servicio: any) {
    this.servicioSeleccionado = servicio;
  }

  cerrarModal() {
    this.servicioSeleccionado = null;
  }
}
