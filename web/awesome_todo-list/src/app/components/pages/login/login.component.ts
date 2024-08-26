import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  formError = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    const val = this.loginForm.value;

    if (val.username && val.password) {
      this.authService
        .login({
          username: val.username,
          password: val.password,
        })
        .subscribe({
          next: (response) => {
            this.authService.user = response;
            this.router.navigate(['']);
          },
          error: (error) => {
            if (error.status) {
              this.formError = true;
            }
          },
        });
    }
  }

  register() {
    this.router.navigate(['register']);
  }
}
