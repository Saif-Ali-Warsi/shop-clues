import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth-service';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      switch (error.status) {

        case 400:
          console.error('Bad Request');
          break;

        case 401:
          console.error('Unauthorized');
          authService.logout();
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
