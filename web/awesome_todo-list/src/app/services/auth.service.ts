import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { TaskResponse } from '../interfaces/task-response';
import { environment } from 'src/environments/environment';
import { SignIn } from '../interfaces/sign-in';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../interfaces/login-response';
import { Router } from '@angular/router';
import { UserResponse } from '../interfaces/user-response';
import { CreateUser } from '../interfaces/create-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user!: LoginResponse | null;

  constructor(private http: HttpClient, private router: Router) {
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
  }

  login(login: SignIn): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(
        `${environment.apiBaseUrl}/user/login`,
        JSON.stringify(login),
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
        }
      )
      .pipe(
        tap((user) => {
          this.user = user;
          localStorage.setItem('user', JSON.stringify(user));
        })
      );
  }

  logout() {
    this.user = null;
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  register(register: CreateUser): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${environment.apiBaseUrl}/user`,
      JSON.stringify(register),
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }
    );
  }

  getToken(): String {
    return this.user != undefined ? this.user.access_token : '';
  }

  isAuthenticated() {
    return this.user != null;
  }

  getCurrentUser(): UserResponse {
    return {
      id: this.user!.id,
      name: this.user!.name,
      email: this.user!.email,
      username: this.user!.username,
    };
  }
}
