import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenService } from "../services/token.service";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const requestForApis = request.url.startsWith(environment.apiUrl);
    const isLoggedIn = this.tokenService.isLoggedIn();

    console.log('inside intercept');
    console.log(`request is ${JSON.stringify(request.body)}`);
    if (isLoggedIn && requestForApis) {
      let session = this.tokenService.getSession();
      if (session){
        request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${session.accessToken}`) });
      }
      
    }
    return next.handle(request);
  }
}
export const AuthInterceptorProvider = { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true };