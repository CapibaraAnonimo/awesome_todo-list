import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { EventBusService } from './event-bus.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(
    private authService: AuthService,
    private eventBusService: EventBusService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({ withCredentials: true });

    return next.handle(req).pipe(
      catchError((error) => {
        console.log(error.status);
        console.log(error);
        if (error instanceof HttpErrorResponse && error.status === 401) {
            console.log('Error Bien');
            this.authService.logout()
            this.router.navigate(['/login']);
          //return this.handle401Error(req, next);
        }

        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    // if (!this.isRefreshing) {
    //   this.isRefreshing = true;

    //   if (this.authService.isAuthenticated()) {
    //     return this.authService.refreshToken().pipe(
    //       switchMap((tokens: Tokens) => {
    //         this.isRefreshing = false;

    //         const newRequest = request.clone({
    //           setHeaders: {
    //             Authorization: `Bearer ${tokens.token}`,
    //           },
    //         });

    //         // Retry the request with the new token
    //         return next.handle(newRequest);
    //       }),
    //       catchError((error) => {
    //         this.isRefreshing = false;

    //         if (error.status == '403' || error.status === '401') {
    //           console.log('Error: ' + error.status);
    //           this.eventBusService.emit(new EventData('logout', null));
    //         }

    //         return throwError(() => error);
    //       })
    //     );
    //   }
    // }

    return next.handle(request);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Dentro del interceptor')
    // Get the token from your authentication service
    const token = this.authService.getToken();
    console.log(token);

    if (req.headers.has('Authorization') || req.url.includes('download')) {
      // Clone the request and add the Authorization header
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Pass the modified request to the next handler
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}

@Injectable()
export class CorsInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
      },
    });

    return next.handle(modifiedReq);
  }
}
