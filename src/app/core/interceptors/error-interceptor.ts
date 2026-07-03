import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {


  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      switch (error.status) {

        case 400:
          console.error('Bad Request');
          break;

        case 401:
          console.error('Unauthorized');
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
