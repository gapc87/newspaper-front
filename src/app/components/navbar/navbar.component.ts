import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  get role() {
    return this.authService.role;
  }

  get name() {
    return this.authService.name;
  }

  get isAdmin() {
    return this.authService.isAdmin;
  }

  toAdmin() {
    this.authService.toAdmin().subscribe();
  }

  logout() {
    this.router.navigateByUrl('/');
    this.authService.logout();
  }
}
