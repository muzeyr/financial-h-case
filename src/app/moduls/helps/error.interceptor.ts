import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router'; 
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
                this.router.navigateByUrl('/logout');
            }

            return throwError(err);
        }));
    }
}
