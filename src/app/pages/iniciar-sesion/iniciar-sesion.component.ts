import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

declare const google: any;

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements AfterViewInit {

  registro = { name: '', email: '', password: '' };
  login = { email: '', password: '' };
  mensaje: string = '';
  esError: boolean = false;

  constructor(private authService: AuthService) {}

  ngAfterViewInit() {
    // Espera un poco para asegurar que el DOM esté listo
    setTimeout(() => {
      if (typeof google !== 'undefined') {
        google.accounts.id.initialize({
          client_id: '93749196415-2eoqil4aj521nvbou6u714cqa1icv5gi.apps.googleusercontent.com',
          callback: this.handleCredentialResponse.bind(this)
        });

        google.accounts.id.renderButton(
          document.querySelector('.g_id_signin'),
          { theme: 'outline', size: 'large', shape: 'pill', text: 'signin_with' }
        );
      } else {
        console.error('⚠️ Google Identity Services no se ha cargado.');
      }
    }, 500);
  }

  handleCredentialResponse(response: any) {
    console.log('✅ Token recibido de Google:', response.credential);
    this.mensaje = 'Inicio de sesión con Google exitoso.';
    this.esError = false;
  }

  registrar() {
    this.authService.register(this.registro).subscribe({
      next: () => {
        this.mensaje = 'Usuario registrado correctamente.';
        this.esError = false;
      },
      error: () => {
        this.mensaje = 'Ocurrió un error al registrar.';
        this.esError = true;
      }
    });
  }

  loadGoogleScript() {
  return new Promise<void>((resolve, reject) => {
    if (document.getElementById('google-jssdk')) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.id = 'google-jssdk';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject();
    document.head.appendChild(script);
  });
}


  iniciarSesion() {
    this.authService.login(this.login).subscribe({
      next: () => {
        this.mensaje = 'Inicio de sesión exitoso.';
        this.esError = false;
      },
      error: () => {
        this.mensaje = 'Correo o contraseña incorrectos.';
        this.esError = true;
      }
    });
  }
}
