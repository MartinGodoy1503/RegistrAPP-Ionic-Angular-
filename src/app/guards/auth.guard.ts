import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isLoggedIn = this.authService.isLoggedIn(); // Método para verificar si el usuario está autenticado

    if (!isLoggedIn) {
      this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión si no está autenticado
      return false;
    }
    return true; // Permitir el acceso si está autenticado
  }
}