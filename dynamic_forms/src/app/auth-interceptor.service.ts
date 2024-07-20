import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import {AuthService} from 'src/app/auth.service'
import { Router } from '@angular/router';
@Injectable()
export class AuthInterceptorClass implements HttpInterceptor {
 

  constructor(private authService: AuthService, private router:Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger
    const token = this.authService.getToken();
    if (token && !this.authService.isTokenExpired(token)) {
      request = request.clone({
        setHeaders: { 
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {          
          return this.authService.refreshToken().pipe(            
            switchMap(() => {
              const newToken = this.authService.getToken();
              if (newToken) {
                // debugger
                request = request.clone({
                  setHeaders: { 
                    Authorization: `Bearer ${newToken}`
                  }
                });
                return next.handle(request);
              }
              this.authService.logout();
              return throwError(error);
            })
          );
        }
        return throwError(error);
      })
    );
  }
}