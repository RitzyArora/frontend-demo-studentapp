import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = () => {
   const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isAdmin()) {

    router.navigate(['/']);

    return false;
  }

  return true;
};
