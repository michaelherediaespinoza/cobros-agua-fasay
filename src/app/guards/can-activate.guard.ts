import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import Swal from 'sweetalert2';

//export const canActivateGuard: CanActivateFn = (route, state) => {
//  return true;
// };

export const canActivateGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {
  const router = inject(Router);
  const authService = inject(AuthService);
  
  return checkLoggingAndRole(state.url, route.data['role'], authService, router);
};

const checkLoggingAndRole = (url: string, requiredRole: string | null, authService: AuthService, router: Router): boolean | UrlTree => {
  if (authService.isLoggedIn(url)) {
    const userRole = authService.getUserRole();
    console.log("role_GET: " + userRole);
    
    if (!requiredRole || requiredRole === userRole) {
      return true;
    } else {
      console.log("**EROOR DE ACCESO**");   
      
      Swal.fire({
        icon: 'error',
        title: 'Acceso Denegado',
        text: 'No tienes permiso para acceder a esta página.',
      });
      
      return router.parseUrl('/access-denied');
    }
  }

    Swal.fire({
       icon: 'error',
        title: 'Acceso Denegado',
        text: 'Debes iniciar sesión para acceder a esta página.',
    });

  return router.parseUrl('/login');
};

