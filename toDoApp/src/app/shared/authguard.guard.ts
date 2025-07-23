import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';


export const authguardLogin: CanActivateFn = (route, state) => {
  
  return inject(AuthService).loggedIn()? true : inject(Router).navigate(['/login']);

};
