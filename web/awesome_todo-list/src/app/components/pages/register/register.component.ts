import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  register() {
    const val = this.form.value;

    if (val.username && val.password) {
      this.authService
        .register({
          name: val.name,
          username: val.username,
          password: val.password,
          email: val.email,
        })
        .subscribe((response) => {
          console.log(response);
          this.authService.user = response;
          this.router.navigate(['']);
        });
    }
  }

  back() {
    this.router.navigate(['login']);
  }
}
