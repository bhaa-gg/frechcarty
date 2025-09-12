import { CanActivateFn } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const _PLATFORM_ID = inject(PLATFORM_ID)
  if (isPlatformBrowser(_PLATFORM_ID)) { // to check is ssr or csr to i need csr
    const _authService = inject(AuthService);
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      try {
        jwtDecode(token!)
      } catch (error) {
        _authService.logout();
        return false;
      }
      return true
    }
    _authService.logout()
    return false;
  }
  return false

};
