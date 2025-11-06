import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  // 🔹 Control del estado de autenticación
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    // Al iniciar, verifica si hay token en localStorage
    const token = localStorage.getItem('token');
    this.isLoggedInSubject.next(!!token);
  }

  // 🔹 Registro de usuario
// 🔹 Registro de usuario
register(user: any): Observable<any> {
  return this.http.post<{ token?: string }>(`${this.apiUrl}/register`, user).pipe(
    tap((response) => {
      // Si el backend devuelve un token, lo guardamos
      if (response && response.token) {
        localStorage.setItem('token', response.token);
      }
      // ✅ Activar sesión de inmediato
      this.isLoggedInSubject.next(true);
    })
  );
}


  // 🔹 Inicio de sesión
  login(credentials: any): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  // 🔹 Cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }

  // 🔹 Obtener token actual (útil para interceptores o headers)
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // 🔹 Comprobar autenticación manualmente
  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }



  // ===========================================================
  // 🧠 NUEVAS FUNCIONALIDADES PARA REDIRECCIÓN AUTOMÁTICA
  // ===========================================================

  // Guarda la ruta y servicio donde el usuario estaba antes de ir al login
  setPendingRedirect(url: string, servicio?: any): void {
    localStorage.setItem('returnUrl', url);
    if (servicio) {
      localStorage.setItem('pendingService', JSON.stringify(servicio));
    }
  }

  // Obtiene la ruta de retorno
  getReturnUrl(): string {
    return localStorage.getItem('returnUrl') || '/catalogo';
  }

  // Obtiene el servicio pendiente (si había)
  getPendingService(): any | null {
    const item = localStorage.getItem('pendingService');
    return item ? JSON.parse(item) : null;
  }

  // Limpia los datos de redirección
  clearPendingRedirect(): void {
    localStorage.removeItem('returnUrl');
    localStorage.removeItem('pendingService');
  }
}





