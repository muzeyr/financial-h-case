import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../../models/user/user-info';
import { UserRespnse } from 'src/app/models/user/user-response';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    public currentUser: Observable<UserInfo>;
    private readonly currentUserSubject: BehaviorSubject<UserInfo>;
    private readonly endpoint = 'merchant/user';
    constructor(private readonly http: HttpClient) {
        try {
            this.currentUserSubject = new BehaviorSubject<UserInfo>(JSON.parse(localStorage.getItem('currentUser')));
            this.currentUser = this.currentUserSubject.asObservable();
        } catch (error) {
        }
    }

    public get currentUserValue(): UserInfo {
        return  this.currentUserSubject.getValue();
    }

    public login = (user: UserInfo) => {
        return this.http.post<UserRespnse>(`${environment.url}${this.endpoint}/login`, user);
    }

    public logout = () => {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
