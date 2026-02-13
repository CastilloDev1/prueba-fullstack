import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./pages/usuarios/usuarios.component').then((m) => m.UsuariosComponent),
      },
      {
        path: 'pedidos',
        loadComponent: () =>
          import('./pages/pedidos/pedidos.component').then((m) => m.PedidosComponent),
      },
      {
        path: 'pagos',
        canActivate: [roleGuard('admin')],
        loadComponent: () =>
          import('./pages/pagos/pagos.component').then((m) => m.PagosComponent),
      },
      {
        path: 'public-api',
        canActivate: [roleGuard('admin')],
        loadComponent: () =>
          import('./pages/public-api/public-api.component').then((m) => m.PublicApiComponent),
      },
      {
        path: 'config',
        canActivate: [roleGuard('admin')],
        loadComponent: () =>
          import('./pages/config/config.component').then((m) => m.ConfigComponent),
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
