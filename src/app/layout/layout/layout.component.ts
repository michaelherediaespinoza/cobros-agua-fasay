import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Menu } from '../../Entity/MenuItem';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { MenuItemComponent } from '../menu-item/menu-item/menu-item.component';

import { MatDrawer } from '@angular/material/sidenav';
import { MatDrawerContainer } from '@angular/material/sidenav';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ MatSidenavModule, MenuItemComponent, MatDrawer, MatDrawerContainer, HeaderComponent, RouterOutlet ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  opened = true;

  toggle(): void {
    this.opened = !this.opened;
  }

  menu: Menu = [
    {
      title: 'Home',
      icon: 'home',
      link: '/home',
      color: '#ff7f0e',
    },
    {
      title: 'Administrador',
      icon: 'view_stream',
      color: '#ff7f0e',
      subMenu: [
        {
          title: 'Agregar Cliente',
          icon: 'person_add_alt',
          link: '/add-cliente',
          color: '#ff7f0e',
        },
        {
          title: 'Listar Clientes',
          icon: 'group_add',
          color: '#ff7f0e',
          link: '/list-cliente',
        },
        /*
        {
          title: 'Agregar medidor',
          icon: 'money',
          color: '#ff7f0e',
          link: '/add-medidor',
        },
        */
        {
          title: 'Listar medidor',
          icon: 'format_list_bulleted',
          color: '#ff7f0e',
          link: '/list-medidor',
        },
        /*
        {
          title: 'Agregar COBRO',
          icon: 'money',
          color: '#ff7f0e',
          link: '/add-cobro-admin',
        },
        */
        {
          title: 'Listar COBRO',
          icon: 'format_list_bulleted',
          color: '#ff7f0e',
          link: '/list-cobro-admin',
        },
        {
          title: 'Gestión User (New)',
          icon: 'group_add',
          color: '#ff7f0e',
          link: '/add-usuario-admin',
        },
        {
          title: 'Gestión User (List)',
          icon: 'view_list',
          color: '#ff7f0e',
          link: '/list-usuario-admin',
        },
        {
          title: 'Reporte (Cobros)',
          icon: 'attach_money',
          color: '#ff7f0e',
          link: '/list-cuadre-caja-admin',
        },
      ],
    },
    {
      title: 'CAJERO',
      icon: 'view_stream',
      color: '#ff7f0e',
      subMenu: [
        {
          title: 'Cobro Agua',
          icon: 'water_drop',
          link: '/add-cobro-caja',
          color: '#ff7f0e',
        },
        {
          title: 'Reporte Diario',
          icon: 'attach_money',
          link: '/list-cierre-caja',
          color: '#ff7f0e',
        },
      ],
    }, 
  ];
}