import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { InactivityService } from './Service/inactivity.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatInputModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cobrosaguafasay';


  constructor(private inactivityService: InactivityService) { }

  ngOnInit(): void {
    // Aquí el servicio ya está inicializado
    // El servicio empezará a monitorear la inactividad cuando se cargue la app
  }

  //borra el contenido del localStorage cuando el usuario intenta cerrar la pestaña o recargar la página.
  @HostListener('window:beforeunload', ['$event'])
  clearLocalStorage(event: BeforeUnloadEvent): void {
    // Borra el localStorage cuando se cierra la pestaña o el navegador se recargue
    localStorage.clear();
    
  }
    
}
