import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // ✅ IMPORTANTE
import { CarritoService } from '../../services/carrito.service';
import { Servicio } from '../catalogo/catalogo.component';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ AGREGA RouterModule
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {
  carrito: Servicio[] = [];
  total: number = 0;

  constructor(private carritoService: CarritoService) {}

  ngOnInit() {
    this.carrito = this.carritoService.obtenerCarrito();
    this.total = this.carritoService.calcularTotal();

    this.carritoService.carrito$.subscribe(items => {
      this.carrito = items;
      this.total = this.carritoService.calcularTotal();
    });
  }

  eliminarItem(item: Servicio) {
    this.carritoService.eliminarDelCarrito(item);
  }

  comprarItem(item: Servicio) {
    alert(`🛒 Compraste: ${item.titulo} por $${item.precio?.toLocaleString()}`);
    this.eliminarItem(item);
  }

  comprarTodo() {
    if (this.carrito.length === 0) return;
    alert(`✅ Compraste ${this.carrito.length} paquetes por un total de $${this.total.toLocaleString()}`);
    this.carritoService.vaciarCarrito();
  }
}
