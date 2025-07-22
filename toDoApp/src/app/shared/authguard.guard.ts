import { CanActivateFn, CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { inject, Injectable } from '@angular/core';


export const authguardLogin: CanActivateFn = (route, state) => {
  
  return inject(AuthService).loggedIn()    ? true : inject(Router).navigate(['/login']);

};
