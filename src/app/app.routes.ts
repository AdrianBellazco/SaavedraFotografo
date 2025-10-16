import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/inicio/inicio.component').then((m) => m.InicioComponent),
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./pages/registro/registro.component').then(
        (m) => m.RegistroComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/iniciar-sesion/iniciar-sesion.component').then(
        (m) => m.IniciarSesionComponent
      ),
  },
];
