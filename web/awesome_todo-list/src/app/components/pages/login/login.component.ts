import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SignIn } from 'src/app/interfaces/sign-in';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    const val = this.form.value;

    if (val.username && val.password) {
      this.authService
        .login({
          username: val.username,
          password: val.password,
        })
        .subscribe((response) => {
          console.log(response);
          this.authService.user = response;
          this.router.navigate(['']);
        });
    }
  }

  register() {
    this.router.navigate(['register']);
  }
}
