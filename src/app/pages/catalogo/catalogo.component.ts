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
  boda = [
    {
      titulo: 'Golden Boda',
      descripcion: 'Capturamos los momentos más importantes de tu día con estilo natural y elegante.',
      detalle: 'Incluye cobertura completa del evento, sesión pre-boda y edición profesional de todas las fotos.',
      imagen: '/assets/p.jpg'
    },
    {
      titulo: 'Platinum Boda',
      descripcion: 'Inmortalizamos este momento único con sesiones creativas y memorables.',
      detalle: 'Sesión personalizada en exteriores o estudio con vestuario, maquillaje y edición de alta calidad.',
      imagen: '/assets/15.jpg'
    },
    {
      titulo: 'Escencial Boda',
      descripcion: 'Retratos urbanos con actitud, perfectos para redes sociales y portafolios.',
      detalle: 'Sesiones en locaciones modernas con iluminación natural o artificial según tu estilo.',
      imagen: '/assets/urban.jpg'
    },
    {
      titulo: 'Digital Boda',
      descripcion: 'Fotografía corporativa profesional para mejorar tu presencia de marca.',
      detalle: 'Incluye retratos de equipo, instalaciones y productos con enfoque empresarial.',
      imagen: '/assets/empresa.jpg'
    },
    {
      titulo: 'Escencial Book boda',
      descripcion: 'Promociona tu marca con videos dinámicos y contenido visual atractivo.',
      detalle: 'Producción completa de videos publicitarios y reels con enfoque en redes sociales.',
      imagen: '/assets/video-marketing.jpg'
    }
  ];

   quinces = [
    {
      titulo: 'Golden quinces',
      descripcion: 'Capturamos los momentos más importantes de tu día con estilo natural y elegante.',
      detalle: 'Incluye cobertura completa del evento, sesión pre-boda y edición profesional de todas las fotos.',
      imagen: '/assets/p.jpg'
    },
    {
      titulo: 'Platinum quinces',
      descripcion: 'Inmortalizamos este momento único con sesiones creativas y memorables.',
      detalle: 'Sesión personalizada en exteriores o estudio con vestuario, maquillaje y edición de alta calidad.',
      imagen: '/assets/15.jpg'
    },
    {
      titulo: 'Escencial quinces',
      descripcion: 'Retratos urbanos con actitud, perfectos para redes sociales y portafolios.',
      detalle: 'Sesiones en locaciones modernas con iluminación natural o artificial según tu estilo.',
      imagen: '/assets/urban.jpg'
    },
    {
      titulo: 'Digital quinces',
      descripcion: 'Fotografía corporativa profesional para mejorar tu presencia de marca.',
      detalle: 'Incluye retratos de equipo, instalaciones y productos con enfoque empresarial.',
      imagen: '/assets/empresa.jpg'
    },
    {
      titulo: 'Escencial Book quinces',
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
