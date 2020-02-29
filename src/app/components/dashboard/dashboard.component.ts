import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/general/authentication.service';
import { UserInfo } from './../../models/user/user-info';
import { TransactionRequest } from 'src/app/models/transaction/transaction-request';
import { TransactionReport } from 'src/app/models/transaction/transaction-report';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public transactionReq: TransactionReport;
  constructor(private readonly authenticationService: AuthenticationService) {
    this.transactionReq = new TransactionReport();
    this.transactionReq.fromDate = '2005-01-01';
    this.transactionReq.toDate = '2019-01-01';
   }

  ngOnInit(): void {

  }

}
