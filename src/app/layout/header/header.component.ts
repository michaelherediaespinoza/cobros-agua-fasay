import { Component, EventEmitter, Output, ChangeDetectionStrategy, OnInit, Input, OnDestroy} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../Service/auth.service';
import { Router } from '@angular/router';
import { ServiceService } from '../../Service/service.service';
import { SharedService } from '../../Service/shared.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule,
            MatSidenavModule, 
            MatMenuModule, 
            MatIconModule, 
            MatButtonModule,
            DatePipe ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Output() menuToggled = new EventEmitter<boolean>(); 

  user: string = 'Usuario';
  dataUsuarioLogin: String;
  todayDate : Date = new Date();

   constructor(private authService: AuthService, private router: Router, private service: ServiceService) { }

   ngOnInit() {
  
   //this.getUserlogiado();
   //this.subscription = interval(5000).subscribe(() => {
   // this.getUserlogiado(); // Llama a la función de actualización cada 5 segundos
   // this.updateDeta();
  //});
  }

  logout(): void {
    console.log('Logged out');
    this.authService.logout();
    this.dataUsuarioLogin = '';
    localStorage.removeItem('usuariologin');
    this.router.navigate(["/login"]);
  }
  
    getUserlogiado(): void {
      let usuarioLogin = localStorage.getItem('usuariologin');
  
      if (usuarioLogin !== null) {
        let usuarioLoginInt = parseInt(usuarioLogin); // Convierte a entero
        if (!isNaN(usuarioLoginInt)) {
            console.log("user logiado CODIGO: " + usuarioLoginInt); // Aquí puedes usar el valor convertido
            this.service.getUsuarioById(usuarioLoginInt)
            .subscribe(data => {
              this.dataUsuarioLogin = data.nombre + " " + data.apellido;
              //console.log("DATA: " );  
              localStorage.removeItem('usuariologin');
            })
        } else {
            console.error('No se pudo convertir a número.');
          }
      } else {
          console.error('No hay usuario en el localStorage.');
        }
    }

    
    updateDeta(): void  {
      this.todayDate = new Date();
    }

}