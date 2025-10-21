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

registro = {
  name: '',
  email: '',
  password: ''
};


login = {
  email: '',
  password: ''
};


  mensaje: string = '';
  esError: boolean = false;

  constructor(private authService: AuthService) {}

registrar() {
  this.authService.register(this.registro).subscribe({
    next: (respuesta) => {
      console.log('✅ Registro exitoso:', respuesta);
      this.mensaje = 'Usuario registrado correctamente.';
      this.esError = false;
    },
    error: (error) => {
      console.error('❌ Error al registrar:', error);
      this.mensaje = error.status === 409 ? '⚠️ El correo ya está registrado.' : 'Ocurrió un error al registrar.';
      this.esError = true;
    }
  });
}

iniciarSesion() {
  this.authService.login(this.login).subscribe({
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
