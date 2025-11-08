import { Routes } from '@angular/router';
import { ClientAnalyzerComponent } from './components/client-analyzer/client-analyzer.component';
import { ChatIaComponent } from './components/chat-ia/chat-ia.component';

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
  
  { path: 'analizador', component: ClientAnalyzerComponent },

  { path: '', redirectTo: 'analizador', pathMatch: 'full' },

  { path: '', component: ChatIaComponent }, 
  { path: '**', redirectTo: '' }
];
