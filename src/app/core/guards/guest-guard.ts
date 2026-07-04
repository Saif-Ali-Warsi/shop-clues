import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth-service';
import { Router } from '@angular/router';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);


  if (authService.isLoggedIn()) {
    router.navigate(['/products'])

    return false;
  }

  return true;
};
