<<<<<<< HEAD
import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

declare const google: any;
=======
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // ajusta la ruta según tu estructura
>>>>>>> master

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './iniciar-sesion.component.html',
<<<<<<< HEAD
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements AfterViewInit {
  registro = { name: '', email: '', password: '' };
  login = { email: '', password: '' };
  mensaje: string = '';
  esError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  // =====================================================
  // GOOGLE SIGN-IN
  // =====================================================
  async ngAfterViewInit() {
    try {
      await this.loadGoogleScript();

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
    } catch (err) {
      console.error('Error al cargar el script de Google:', err);
    }
  }

  private loadGoogleScript(): Promise<void> {
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

  handleCredentialResponse(response: any) {
    console.log('✅ Token recibido de Google:', response.credential);
    this.mensaje = 'Inicio de sesión con Google exitoso.';
    this.esError = false;

    this.redirigirDespuesDeLogin();
  }

  // =====================================================
  // REGISTRO MANUAL
  // =====================================================
  registrar() {
    this.authService.register(this.registro).subscribe({
      next: () => {
        this.mensaje = 'Usuario registrado correctamente.';
        this.esError = false;
        this.redirigirDespuesDeLogin();
      },
      error: () => {
        this.mensaje = 'Ocurrió un error al registrar.';
        this.esError = true;
      }
    });
  }

  // =====================================================
  // LOGIN MANUAL
  // =====================================================
  iniciarSesion() {
    this.authService.login(this.login).subscribe({
      next: () => {
        this.mensaje = 'Inicio de sesión exitoso.';
        this.esError = false;
        this.redirigirDespuesDeLogin();
      },
      error: () => {
        this.mensaje = 'Correo o contraseña incorrectos.';
        this.esError = true;
      }
    });
  }

  // =====================================================
  // 🔁 REDIRECCIÓN DESPUÉS DE LOGIN / REGISTRO
  // =====================================================
  private redirigirDespuesDeLogin() {
    const returnUrl = this.authService.getReturnUrl();
    const servicioPendiente = this.authService.getPendingService();

    // Limpia datos temporales
    this.authService.clearPendingRedirect();

    // Si había un servicio pendiente, podrías guardarlo en un servicio global
    if (servicioPendiente) {
      console.log('🔁 Servicio pendiente:', servicioPendiente);
      // Más adelante aquí reabriremos el modal del servicio en catálogo
    }

    // Redirige al usuario a donde estaba
    this.router.navigateByUrl(returnUrl || '/catalogo');
  }
=======
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

>>>>>>> master
}
