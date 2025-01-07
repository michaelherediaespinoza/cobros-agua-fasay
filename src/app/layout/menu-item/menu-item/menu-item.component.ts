import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {RouterModule} from '@angular/router';
import { Menu } from '../../../Entity/MenuItem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [MatIconModule, MatExpansionModule, MatListModule, RouterModule, CommonModule],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemComponent {
  @Input() menu: Menu = [];
}
