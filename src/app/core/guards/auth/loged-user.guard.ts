import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const logedUserGuard: CanActivateChildFn = (childRoute, state) => {
  const _PLATFORM_ID = inject(PLATFORM_ID)


  if (isPlatformBrowser(_PLATFORM_ID)) {
    const _router = inject(Router);
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');


    if (token && userData) {

      try {
        jwtDecode(token!)
        _router.navigate(['/home'])
        return false
      } catch (error) {
        return true;
      }
    }
    return true;
  }



  return true
};
