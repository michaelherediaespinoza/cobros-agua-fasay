import { Routes, RouterLink } from '@angular/router';
import { AddClienteComponent } from './Cliente/add-cliente/add-cliente.component';
import { ListClienteComponent } from './Cliente/list-cliente/list-cliente.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { HomeComponent } from './home/home/home.component';
import { AddMedidorComponent } from './Medidor/add-medidor/add-medidor.component';
import { ListMedidorComponent } from './Medidor/list-medidor/list-medidor.component';
import { AddCobroAdminComponent } from './Admin/Cobro/add-cobro-admin/add-cobro-admin.component';
import { ListCobroAdminComponent } from './Admin/Cobro/list-cobro-admin/list-cobro-admin.component';
import { AddCobroCajaComponent } from './Cajero/Caja/add-cobro-caja/add-cobro-caja.component';
import { ListCierreCajaComponent } from './Cajero/Caja/list-cierre-caja/list-cierre-caja.component';
import { LoginComponent } from './Login/login/login.component';
import { canActivateGuard } from './guards/can-activate.guard';
import { AddUsuarioAdminComponent } from './Admin/Usuario/add-usuario-admin/add-usuario-admin.component';
import { ListUsuarioAdminComponent } from './Admin/Usuario/list-usuario-admin/list-usuario-admin.component';
import { ListCuadreCajaAdminComponent } from './Admin/Reporte/list-cuadre-caja-admin/list-cuadre-caja-admin.component';

export const routes: Routes = [
  //  { path: 'navigation', component: NavigationComponent},
  //  { path: 'dashboard', component: DashboardComponent},
  //  { path: 'add-cliente', component: AddClienteComponent},
  //  { path: 'list-cliente', component: ListClienteComponent},

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'add-cliente',
        component: AddClienteComponent,
        canActivate: [canActivateGuard],
        data: { role: 'ADMIN' },
      },
      {
        path: 'list-cliente',
        component: ListClienteComponent,
        canActivate: [canActivateGuard],
        data: { role: 'ADMIN' },
      },
      {
        path: 'add-medidor',
        component: AddMedidorComponent,
        canActivate: [canActivateGuard],
        data: { role: 'ADMIN' },
      },
      {
        path: 'list-medidor',
        component: ListMedidorComponent,
        canActivate: [canActivateGuard],
        data: { role: 'ADMIN' },
      },
      {
        path: 'add-cobro-admin',
        component: AddCobroAdminComponent,
        canActivate: [canActivateGuard],
        data: { role: 'ADMIN' },
      },
      {
        path: 'list-cobro-admin',
        component: ListCobroAdminComponent,
        canActivate: [canActivateGuard],
        data: { role: 'ADMIN' },
      },
      {
        path: 'add-cobro-caja',
        component: AddCobroCajaComponent,
        canActivate: [canActivateGuard],
        data: { role: 'CAJERO' },
      },
      {
        path: 'list-cierre-caja',
        component: ListCierreCajaComponent,
        canActivate: [canActivateGuard],
        data: { role: 'CAJERO' },
      },
      {
        path: 'add-usuario-admin',
        component: AddUsuarioAdminComponent,
        canActivate: [canActivateGuard],
        data: { role: 'ADMIN' },
      },
      {
        path: 'list-usuario-admin',
        component: ListUsuarioAdminComponent,
        canActivate: [canActivateGuard],
        data: { role: 'ADMIN' },
      },
      {
        path: 'list-cuadre-caja-admin',
        component: ListCuadreCajaAdminComponent,
        canActivate: [canActivateGuard],
        data: { role: 'ADMIN' },
      }
    ]
  }
];
