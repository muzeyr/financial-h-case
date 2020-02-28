import { Component, OnInit, Input } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { TransactionReport } from 'src/app/models/transaction/transaction-report';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { TransactionResponse } from 'src/app/models/transaction/transaction-response';
import { NgxUiLoaderService } from 'ngx-ui-loader';



@Component({
  selector: 'app-transaction-report',
  templateUrl: './transaction-report.component.html',
  styleUrls: ['./transaction-report.component.css']
})
export class TransactionReportComponent implements OnInit {
  public transactionReport: TransactionReport;
  public date: { year: number, month: number };
  public hoveredDate: NgbDate;
  public fromDate: NgbDate;
  public toDate: NgbDate;
  public transactionResponse: TransactionResponse;
  public showDateFilter: boolean;
  public isLoadComplate: boolean;

  @Input() transactionReportProps: TransactionReport;


  constructor(private readonly transactionService: TransactionService,
              private readonly calendar: NgbCalendar,
              private readonly ngxService: NgxUiLoaderService,
              public formatter: NgbDateParserFormatter) {

    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.showDateFilter = true;
    this.isLoadComplate = false;

  }

  public ngOnInit(): void {
    if (this.transactionReportProps) {
      this.showDateFilter = false;
    } else {
      this.showDateFilter = true;
    }
    console.log(this.transactionReportProps);
    this.onloadData();

  }
  public onloadData(): void {

    this.transactionReport = new TransactionReport();
    this.transactionReport.fromDate = this.fromDate.year + '-'
      + this.fromDate.month + '-' + this.fromDate.day;
    this.transactionReport.toDate = this.toDate.year + '-' + this.toDate.month + '-' + this.toDate.day;
    this.transactionReport.fromDate = '2018-07-01';
    this.transactionReport.toDate = '2020-10-01';
    this.ngxService.start();

    this.transactionService.report(this.transactionReport).subscribe(data => {
      this.transactionResponse = data;
      if (this.transactionResponse.response.length > 0) {
        this.isLoadComplate = true;
        this.ngxService.stop();

      }
    }, error => {
      this.ngxService.stop();
    });
  }
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.onloadData();
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate, input: string): NgbDate {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
  public randomCss(): string {
    return 'success';
  }
}
