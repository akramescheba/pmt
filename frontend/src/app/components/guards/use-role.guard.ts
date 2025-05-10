import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const useRoleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  const userRole = localStorage.getItem('role');
  const rolesAutorises = route.data?.['roles'] as string[];

  if (userRole && rolesAutorises && rolesAutorises.includes(userRole)) {
    toastr.info(`Vous êtes connecté en tant que ${userRole}`);
    return true;
  }

  toastr.error("Vous n'avez pas les droits d'accès à cette page");

  if (userRole === "Administrateur") {
    router.navigate(["/admin"]);
  } else if (userRole === "Membre") {
    router.navigate(["/membre"]);
  } else if (userRole === "Observateur") {
    router.navigate(["/observateur"]);
  } 

  return false;
};
