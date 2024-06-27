
import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { TokenService } from "../services/token.service";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);
  
  let session = tokenService.getSession();
  if (session == null) {
    router.navigate(['/login']);
    return false;
  }

  if (!tokenService.isLoggedIn()) {
    router.navigate(['/login']);
  }
        return true;

  return true;
};

