import { Component } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import { CustomValidators } from '../../../providers/CustomValidators';

import { UUID } from 'angular2-uuid';
import Swal from "sweetalert2";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  signUpForm: FormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      passwordRepeat: new FormControl('', [Validators.required]),
      uuid: new FormControl(UUID.UUID())
    },
    CustomValidators.passwordMatch('password', 'passwordRepeat')
  );

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  register() {
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.invalid) return;

    const { name, email, password, uuid } = this.signUpForm.value;

    this.authService.register(email, password, name, uuid)
      .subscribe(ok => {
        if (ok === true) {
          this.router.navigateByUrl('/sign-in');
          Swal.fire('Cuenta creada', 'Nueva cuenta creada con éxito. Inicia sesión a continuación.', 'success');
        } else {
          Swal.fire('Error', ok, 'error');
        }
      });
  }

  get name() { return this.signUpForm.get('name'); }
  get email() { return this.signUpForm.get('email'); }
  get password() { return this.signUpForm.get('password'); }
  get passwordRepeat() { return this.signUpForm.get('passwordRepeat'); }
}
