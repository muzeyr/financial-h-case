import { Observable } from 'rxjs';
import { UserInfo } from '../../models/user/user-info';
import { environment } from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { TransactionReport } from 'src/app/models/transaction/transaction-report';
import { TransactionResponse } from 'src/app/models/transaction/transaction-response';
import { TransactionClient } from 'src/app/models/transaction/transaction-client';
import { Injectable } from '@angular/core';
import { TransactionRequest } from './../../models/transaction/transaction-request';
import { TransactionQuery } from 'src/app/models/transaction/transaction-query';
import { TransactionDetail } from 'src/app/models/transaction/transaction-detail';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    private readonly endpoint = 'transactions';

    constructor(
        private readonly httpClient: HttpClient
    ) {

    }
    public report(report: TransactionReport): Observable<TransactionResponse> {
        return this.httpClient.post<TransactionResponse>(`
                    ${environment.url}${this.endpoint}/report`, report);
    }

    public list(report: TransactionRequest): Observable<TransactionQuery> {
        return this.httpClient.post<TransactionQuery>(`
                    ${environment.url}transaction/list`, report);
    }
    public client(client: TransactionClient): Observable<TransactionDetail> {
        return this.httpClient.post<TransactionDetail>(`
                    ${environment.url}${this.endpoint}/client`, client);
    }
    public get(client: TransactionClient): Observable<TransactionDetail> {
        return this.httpClient.post<TransactionDetail>(`
                    ${environment.url}transaction`, client);
    }
}
