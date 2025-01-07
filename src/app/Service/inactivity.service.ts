import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InactivityService {

  private timeoutId: any;
  private readonly timeout: number = 60000; // 10 minutos (en milisegundos)

  constructor(private router: Router) {
    this.initListener();
    this.resetTimer();
  }

  // Inicia los listeners para detectar actividad
  initListener() {
    window.addEventListener('mousemove', () => this.resetTimer());
    window.addEventListener('keydown', () => this.resetTimer());
  }

  // Reinicia el temporizador
  resetTimer() {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => this.logout(), this.timeout);
  }

  // Cierra sesión y redirige al login
  logout() {

     // Guardar mensaje de sesión caducada
    localStorage.setItem('sessionMessage', 'La sesión ah caducado, \n Vuelva a iniciar sesión.');

    // Aquí puedes realizar acciones como eliminar el token
    localStorage.removeItem('authToken');
    localStorage.removeItem('usuariologin');
    this.router.navigate(['/login']);
  }
}