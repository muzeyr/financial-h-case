import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TransactionReport } from 'src/app/models/transaction/transaction-report';
import { TransactionResponse } from 'src/app/models/transaction/transaction-response';
import { AuthenticationService } from 'src/app/services/general/authentication.service';
import { TransactionService } from 'src/app/services/transaction/transaction.service';

import { ChartType, LegendItem } from '../lbd/lbd-chart/lbd-chart.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public transactionReq: TransactionReport;
  public accoundChartType: ChartType;
  public accoundChartData: any;
  public transactionResponse: TransactionResponse;
  public accoundChartLegendItems: LegendItem[];
  public cartType: string[];


  constructor(private readonly authenticationService: AuthenticationService,
              private readonly ngxService: NgxUiLoaderService,
              private readonly transactionService: TransactionService) {
    this.transactionReq = new TransactionReport();
    this.transactionReq.fromDate = '2005-01-01';
    this.transactionReq.toDate = '2019-01-01';
    this.cartType = ['fa fa-circle text-info', 'fa fa-circle text-danger', 'fa fa-circle text-warning', 'fa fa-circle text-success'];


    this.transactionService.report(this.transactionReq).subscribe(data => {
      this.ngxService.stop();
      this.transactionResponse = data;
      console.log(data);
    }, error => {
      this.ngxService.stop();
    });


   }

  ngOnInit(): void {
    this.accoundChartType = ChartType.Pie;
    this.accoundChartData = {
      labels: ['62%', '32%', '6%'],
      series: [62, 32, 6]
    };
    this.accoundChartLegendItems = [
      { title: 'TL', imageClass: 'fa fa-circle text-info' },
      { title: 'Euro', imageClass: 'fa fa-circle text-danger' },
      { title: 'Rub', imageClass: 'fa fa-circle text-warning' }
    ];
  }

  public chartCss(): string {
    return this.cartType[Math.floor(Math.random() * Math.floor(2))];
  }

}
