import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BussyService } from '../services/bussy-service';
import { delay, finalize, of, tap } from 'rxjs';

 const cache = new Map<string, HttpEvent<unknown>>();

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const bussyService = inject(BussyService);

  if(req.method === "GET")
  {
    const response = cache.get(req.url);
    if(response)
    {
      return of(response);
    }
  }

  bussyService.busy();

  return next(req).pipe(
    delay(500),
    tap(response => {
      cache.set(req.url, response)
    }),
    finalize(()=> {
      bussyService.idle()
    })
  );
};
