import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './../../general/authentication.service';



@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private readonly authenticationService: AuthenticationService) {}

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
            if (currentUser !== null) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `${currentUser.token}`
                    }
                });
            }
        }

        return next.handle(request);
    }
}
