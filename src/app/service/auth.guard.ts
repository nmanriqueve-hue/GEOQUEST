import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  console.log('AuthGuard ejecutado. Token encontrado:', token);

  if (token) {
    console.log('Acceso permitido');
    return true;
  } else {
    console.warn('Acceso denegado — redirigiendo al login');
    router.navigate(['/login']);
    return false;
  }
};
