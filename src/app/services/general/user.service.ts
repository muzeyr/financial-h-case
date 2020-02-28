import { Observable } from 'rxjs';
import { UserInfo } from '../../models/user/user-info';
import { environment } from './../../../environments/environment';
import {HttpClient} from '@angular/common/http';

export class UserService {
    private readonly endpoint = 'user';

    constructor(
        private readonly httpClient: HttpClient
    ) {

    }
    public login(user: UserInfo): Observable<any> {
        return this.httpClient.post<any>(`${environment.url}/${this.endpoint}/login`, user);
    }
}
