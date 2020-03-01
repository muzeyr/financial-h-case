import { Component, OnInit, Input } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { TransactionReport } from 'src/app/models/transaction/transaction-report';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { TransactionResponse } from 'src/app/models/transaction/transaction-response';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ToastrManager } from 'ng6-toastr-notifications';



@Component({
  selector: 'app-transaction-report',
  templateUrl: './transaction-report.component.html',
  styleUrls: ['./transaction-report.component.css']
})
export class TransactionReportComponent implements OnInit {
  public transactionReport: TransactionReport;
  public transactionResponse: TransactionResponse;
  public showDateFilter: boolean;
  public isLoadComplate: boolean;
  public form: FormGroup;


  @Input() transactionReportProps: TransactionReport;


  constructor(private readonly transactionService: TransactionService,
              private readonly formBuilder: FormBuilder,
              private readonly datePipe: DatePipe,
              public toastr: ToastrManager,
              private readonly ngxService: NgxUiLoaderService,
              public formatter: NgbDateParserFormatter) {

    this.form = formBuilder.group({
      fromDate: [this.datePipe.transform('2008-01-01' , 'yyyy-MM-dd'), [Validators.required]],
      toDate: [this.datePipe.transform(new Date() , 'yyyy-MM-dd'), [Validators.required]],
    });
    this.showDateFilter = true;
    this.isLoadComplate = false;

  }

  public ngOnInit(): void {
    if (this.transactionReportProps) {
      this.showDateFilter = false;
    } else {
      this.showDateFilter = true;
    }
    this.onloadData();

  }
  public onloadData(): void {
    this.transactionReport = new TransactionReport();
    this.transactionReport.fromDate = this.form.value.fromDate;
    this.transactionReport.toDate = this.form.value.toDate;
    this.ngxService.start();

    this.transactionService.report(this.transactionReport).subscribe(data => {
      this.ngxService.stop();
      this.transactionResponse = data;
      if (this.transactionResponse.response.length > 0) {
        this.isLoadComplate = true;
      } else {
        this.toastr.warningToastr('No Records Found', 'No Data');

      }
    }, error => {
      this.ngxService.stop();
    });
  }

  public randomCss(): string {
    return 'success';
  }
}
