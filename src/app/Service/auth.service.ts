import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  readonly ISLOGGEDKEY = 'islogged';
  readonly USERROLEKEY = 'userrole';
  public urlUsuarioIntentaAcceder = '';

  public changeLoginStatusSubject = new Subject<boolean>();
  public changeLoginStatus$ = this.changeLoginStatusSubject.asObservable();

  login(role: string) {
    localStorage.setItem(this.ISLOGGEDKEY, 'true');
    localStorage.setItem(this.USERROLEKEY, role);
    this.changeLoginStatusSubject.next(true);
  }

  logout() {
    localStorage.removeItem(this.ISLOGGEDKEY);
    localStorage.removeItem(this.USERROLEKEY);
    this.changeLoginStatusSubject.next(false);
  }

  isLoggedIn(url: string) {
    const isLogged = localStorage.getItem(this.ISLOGGEDKEY);
    if (!isLogged) {
      this.urlUsuarioIntentaAcceder = url;
      return false;
    }
    return true;
  }
  
  getUserRole() {
    return localStorage.getItem(this.USERROLEKEY);
  }
}
