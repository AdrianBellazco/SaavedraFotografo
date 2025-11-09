import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { StripePaymentService } from '../../services/stripe-payment.service';
import { Servicio } from '../catalogo/catalogo.component';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {
  carrito: Servicio[] = [];
  total: number = 0;
  paying = false;
  paymentMessage = '';
  bookingMode = false;
  bookingDate: string = '';// ISO local date-time (to be combined)
  bookingTime: string = '';// HH:MM
  sessionId: string | null = null;

  constructor(private carritoService: CarritoService, private stripeService: StripePaymentService) {}

  ngOnInit() {
    this.carrito = this.carritoService.obtenerCarrito();
    this.total = this.carritoService.calcularTotal();

    this.carritoService.carrito$.subscribe(items => {
      this.carrito = items;
      this.total = this.carritoService.calcularTotal();
    });

    // Detectar retorno de Stripe Checkout
    // Ya no manejamos reserva aquí; se hace en calendario
  }


  eliminarItem(item: Servicio) {
    this.carritoService.eliminarDelCarrito(item);
  }

  comprarItem(item: Servicio) {
    alert(`🛒 Compraste: ${item.titulo} por $${item.precio?.toLocaleString()}`);
    this.eliminarItem(item);
  }

  async comprarTodo() {
    return this.pagarCheckout();
  }

  async pagarCheckout() {
    if (this.carrito.length === 0) { this.paymentMessage = 'Carrito vacío'; return; }
    localStorage.setItem('prePurchaseItems', JSON.stringify(this.carrito));
    this.paying = true;
    this.paymentMessage = '';
    try {
      const items = this.carrito.map(c => ({ name: c.titulo, amount: c.precio || 0 }));
  const { url, error } = await this.stripeService.createCheckoutSession(items, 'cop');
      if (error || !url) {
        this.paymentMessage = error || 'No se pudo crear la sesión de pago';
        this.paying = false;
        return;
      }
      window.location.href = url as string; // url viene definido si no hubo error
    } catch (e: any) {
      this.paymentMessage = e?.message || 'Error redirigiendo a checkout';
      this.paying = false;
    }
  }

  // Reserva se gestiona en calendario
}
