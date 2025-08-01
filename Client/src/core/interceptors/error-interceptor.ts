import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast-service';
import { catchError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const router = inject(Router);

  return next(req).pipe(
    catchError(error => {
      if(error)
      {
        switch (error.status) {
          case 500:
            const navigationExtras : NavigationExtras = {state: {error: error.error}}
            router.navigateByUrl('/server-error', navigationExtras)
            break;
          case 401:
            toastService.error("Unauthorized");
            break;
          case 404:
            router.navigateByUrl('/not-found')
            break;
          case 400:
            if(error.error.errors)
            {
              const modelStateErrors = [];
              for(const key in error.error.errors) {
                if(error.error.errors[key])
                {
                  modelStateErrors.push(error.error.errors[key])
                }
              }
              throw modelStateErrors.flat();
            } else {
              toastService.error(error.error);
            }
            break;                                
          default:
            toastService.error("Something unexpected happened");
            break;
        }
      }

      throw error;
    })
  )
};
