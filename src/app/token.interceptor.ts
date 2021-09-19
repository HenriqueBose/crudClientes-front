import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const tokenString = localStorage.getItem('access_token')
    const url = request.url;


    if (tokenString && !url.endsWith('/oauth/token') && !url.startsWith('https://viacep') ){ //impedir que o interceptor intercepte a geração do bearer token no momento do login
      const token = JSON.parse(tokenString);
      const jwt = token.access_token;
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer '+ jwt
        }
      })
    }

    return next.handle(request);
  }
}
