import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // ajusta la ruta según tu estructura

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent {

  nombre: string = '';
  email: string = '';
  password: string = '';

  mensaje: string = '';
  esError: boolean = false;

  constructor(private authService: AuthService) {}

  registrar() {
    const datos = {
      nombre: this.nombre,
      email: this.email,
      password: this.password
    };

    this.authService.register(datos).subscribe({
      next: (respuesta) => {
        console.log('✅ Registro exitoso:', respuesta);
        this.mensaje = 'Usuario registrado correctamente.';
        this.esError = false;
      },
      error: (error) => {
        console.error('❌ Error al registrar:', error);
        if (error.status === 409) {
          this.mensaje = '⚠️ El correo ya está registrado.';
        } else {
          this.mensaje = 'Ocurrió un error al registrar.';
        }
        this.esError = true;
      }
    });
  }

  iniciarSesion() {
    const datos = {
      email: this.email,
      password: this.password
    };

    this.authService.login(datos).subscribe({
      next: (respuesta) => {
        console.log('✅ Sesión iniciada:', respuesta);
        this.mensaje = 'Inicio de sesión exitoso.';
        this.esError = false;
      },
      error: (error) => {
        console.error('❌ Error al iniciar sesión:', error);
        this.mensaje = 'Correo o contraseña incorrectos.';
        this.esError = true;
      }
    });
  }
}
