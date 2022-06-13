import { Injectable } from '@angular/core';
import {CanActivate, CanLoad, Router} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {AuthService} from "../services/auth.service";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AdminValidationGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  canActivate(): Observable<boolean> | boolean {
    return this.authService.isAdmin.pipe(
      tap(isAdmin => {
        if (!isAdmin) {
          this.router.navigateByUrl('/');
          Swal.fire('Error', 'No tienes acceso a este módulo.', 'info');
        }
      })
    );
  }

  canLoad(): Observable<boolean> | boolean {
    return this.authService.isAdmin.pipe(
      tap(isAdmin => {
        if (!isAdmin) {
          this.router.navigateByUrl('/');
          Swal.fire('Error', 'No tienes acceso a este módulo.', 'info');
        }
      })
    );
  }
}
