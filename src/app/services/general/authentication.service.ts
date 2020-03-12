import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../../models/user/user-info';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    public currentUser: Observable<UserInfo>;
    private readonly currentUserSubject: BehaviorSubject<UserInfo>;
    private readonly endpoint = 'merchant/user';
    constructor(private readonly http: HttpClient) {
            this.currentUserSubject = new BehaviorSubject<UserInfo>(JSON.parse(localStorage.getItem('currentUser')));
            this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): UserInfo {
        return  this.currentUserSubject.getValue();
    }

    public login(user: UserInfo): Observable<UserInfo> {
        return this.http.post<UserInfo>(`${environment.url}${this.endpoint}/login`, user);
    }

    public logout(): Observable<boolean> {
          localStorage.removeItem('currentUser');
          this.currentUserSubject.next(null);
          return observableOf(true);
    }
}
