import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/general/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    public errorLog: boolean;
    public loginUrl: string;

    constructor(private readonly authenticationService: AuthenticationService,
                private readonly router: Router
        ) {
        }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                this.router.navigateByUrl('/log-out');
            }

            return throwError(err);
        }));
    }
}
