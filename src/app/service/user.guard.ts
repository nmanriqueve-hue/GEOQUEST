import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const userGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getUserRole() === 'ADMIN') {
    router.navigate(['/admin']); // admin va a su panel
    return false;
  }

  return true;
};
