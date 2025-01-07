import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { PageHeaderComponent } from '../../layout/page-header/page-header.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { InactivityService } from '../../Service/inactivity.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, 
            PageHeaderComponent,
            MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  //private inactivityService: InactivityService      poner en el contructor
  constructor() { }

  ngOnInit() {
    // El servicio comenzará a monitorear la inactividad
  }

}
