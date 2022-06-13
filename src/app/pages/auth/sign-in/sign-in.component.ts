import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  signInForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  signIn() {
    this.signInForm.markAllAsTouched();
    if (this.signInForm.invalid) return;

    const { email, password } = this.signInForm.value;

    this.authService.login(email, password)
      .subscribe(ok => {
        if (ok === true) {
          this.router.navigateByUrl('/');
        } else {
          Swal.fire('Error', ok, 'error');
        }
      });
  }

  get email() { return this.signInForm.get('email'); }
  get password() { return this.signInForm.get('password'); }
}
