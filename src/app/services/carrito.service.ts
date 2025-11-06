import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Servicio } from '../pages/catalogo/catalogo.component'; // Usa tu interfaz Servicio

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private carrito: Servicio[] = [];
  private carritoSubject = new BehaviorSubject<Servicio[]>([]);
  carrito$ = this.carritoSubject.asObservable();

  constructor() {
    // Cargar desde localStorage al iniciar
    const data = localStorage.getItem('carrito');
    if (data) {
      this.carrito = JSON.parse(data);
      this.carritoSubject.next(this.carrito);
    }
  }

  private guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    this.carritoSubject.next([...this.carrito]);
  }

  agregarAlCarrito(servicio: Servicio) {
    const existe = this.carrito.find(item => item.titulo === servicio.titulo);
    if (!existe) {
      this.carrito.push(servicio);
      this.guardarCarrito();
    }
  }

  eliminarDelCarrito(servicio: Servicio) {
    this.carrito = this.carrito.filter(item => item.titulo !== servicio.titulo);
    this.guardarCarrito();
  }

  vaciarCarrito() {
    this.carrito = [];
    this.guardarCarrito();
  }

  obtenerCarrito(): Servicio[] {
    return [...this.carrito];
  }

  calcularTotal(): number {
    return this.carrito.reduce((sum, item) => sum + (item.precio || 0), 0);
  }
}
