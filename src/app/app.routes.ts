import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent :()=> import('./pages/inicio/inicio.component').then(m => m.InicioComponent)
    }
];
