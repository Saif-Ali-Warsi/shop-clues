import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth-service';
import { inject } from '@angular/core';
import { NotificationService } from '../../shared/services/notification-service';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

const authService = inject(AuthService);
const router = inject(Router);
const notification = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      switch (error.status) {

        case 400:
          console.error('Bad Request');
          break;

        case 403:
          console.error('Forbidden');
          break;

        case 404:
          console.error('Not Found');
          break;

        case 500:
          console.error('Internal Server Error');
          break;

        default:
          console.error('Something went wrong');
      }

      return throwError(() => error)
    })
  )

};
