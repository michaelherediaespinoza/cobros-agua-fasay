import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private userSubject = new BehaviorSubject<any>(null); // Estado inicial vacío
  currentUser = this.userSubject.asObservable(); // Observable para suscribirse a los cambios

  updateUser(user: any) {
    this.userSubject.next(user); // Emitir el nuevo valor
  }
}